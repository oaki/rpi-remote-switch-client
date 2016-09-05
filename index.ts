/// <reference path="./rpio.d.ts" />

import rpio = require("rpio");
import socketIoClient = require("socket.io-client");

const config = require("./config.json");
const socket = socketIoClient(config.server.url);

socket.on('connect', () => {
    console.log("Connected");
});

socket.on('setPin', (data) => {
    console.log(`Relay ${data.relay} was switched ${data.state ? "ON" : "OFF"}`);
    //rpio.write(1, rpio.HIGH);
});

socket.on('disconnect', () => {
    console.log("Disonnected");
});

socket.on('error', (err: Error) => {
    console.error(err);
});

socket.connect();
console.log("Connecting");