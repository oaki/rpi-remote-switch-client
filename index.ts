/// <reference path="./rpio.d.ts" />

import rpio = require("rpio");
import socketIoClient = require("socket.io-client");
import Relay from "./src/devices/Relay";
import PIR from "./src/devices/PIR";
import {DeviceConfig, RelayConfig, PIRConfig} from "./src/DevicesConfig";
import {ServerMessages, ClientMessages} from "./src/commands/SocketMessages";
import DeviceNotFoundError from "./src/errors/DeviceNotFoundError";

const generalConfig = require("./config/general.json");
const devicesConfig: DeviceConfig[] = require("./config/devices.json");
const socket = socketIoClient(generalConfig.server.url);

const relays: Relay[] = [];
const pirs: PIR[] = [];

socket.on('connect', () => {
    console.log("Connected");
});

socket.on('disconnect', () => {
    console.log("Disonnected");
});

socket.on('error', (err: Error) => {
    console.error(err);
});

socket.connect();

loadDevices();
initDevices();

/**
 * Loads configuration for all devices
 */
function loadDevices() {
    for (let deviceConfig of devicesConfig) {
        switch (deviceConfig.type) {

            case "relay":
                relays.push(new Relay(rpio, <RelayConfig>deviceConfig));
                break;

            case "pir":
                pirs.push(new PIR(rpio, <PIRConfig>deviceConfig));
                break;

            default:
                throw new Error(`Unsupported device type found in devices config: ${deviceConfig.type}`);

        }

    }
}

/**
 * Initializes all devices
 */
function initDevices() {
    for (let relay of relays) {
        relay.init();

        socket.on(ServerMessages.relay_switchOn, (id: number) => {
            const relay = relays.find(relay => { return relay.id === id; });
            if (relay) {
                relay.state = true;
            }
            else {
                throw new DeviceNotFoundError("relay", id);
            }
        });

        socket.on(ServerMessages.relay_switchOff, (id: number) => {
            const relay = relays.find(relay => { return relay.id === id; });
            if (relay) {
                relay.state = false;
            }
            else {
                throw new DeviceNotFoundError("relay", id);
            }
        });
    }

    for (let pir of pirs) {
        pir.on("motionStart", () => {
            socket.emit(ClientMessages.pir_motionStart, pir.id);
        });

        pir.on("motionEnd", () => {
            socket.emit(ClientMessages.pir_motionEnd, pir.id);
        });

        pir.init();
    }
}

