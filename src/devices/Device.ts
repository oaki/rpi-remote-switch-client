import {DeviceConfig} from "../DevicesConfig";
import EventEmitter = NodeJS.EventEmitter;

abstract class Device extends EventEmitter {
    private _id;
    private  _name;

    constructor(
        config: DeviceConfig
    ) {
        super();
        this._id = config.id;
        this._name = config.name;
    }

    abstract init(): void;

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}

export default Device;