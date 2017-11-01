/**
 * Created by Dominik on 10.9.16.
 */

import Device from "./Device";
import EventEmitter = NodeJS.EventEmitter;
import {PIRConfig} from "../DevicesConfig";

export default class PIR extends Device {
    constructor(
        private rpio: RPIOStatic,
        private config: PIRConfig
    ) {
        super(config);
    }

    get isMotionDetected(): boolean {
        return this.rpio.read(this.config.pin) === this.rpio.HIGH;
    }

    init() {
        this.rpio.open(this.config.pin, this.rpio.INPUT);
        this.rpio.poll(this.config.pin, pin => this.stateChanged())
    }

    private stateChanged() {
        this.emit(this.isMotionDetected ? "motionStart" : "motionEnd");
    }
}



