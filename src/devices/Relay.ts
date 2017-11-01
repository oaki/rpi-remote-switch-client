/**
 * Created by Dominik on 10.9.16.
 */

import Device from "./Device";
import {RelayConfig} from "../DevicesConfig";

export default class Relay extends Device {
    constructor(
        private rpio: RPIOStatic,
        private config: RelayConfig
    ) {
        super(config);
    }

    get state(): boolean {
        return this.rpio.read(this.config.pin) === this.rpio.HIGH;
    }

    set state(value: boolean) {
        this.rpio.write(this.config.pin, value ? this.rpio.HIGH : this.rpio.LOW);
    }

    init() {
        this.rpio.open(this.config.pin, this.rpio.OUTPUT);
        if (typeof this.config.defaultState !== "undefined") {
            this.state = this.config.defaultState;
        }
    }
}

