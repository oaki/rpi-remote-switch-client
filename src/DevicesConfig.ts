/**
 * Created by Dominik on 10.9.16.
 */

export interface DeviceConfig {
    type: "relay" | "pir";
    id: number;
    name: string;
}

export interface RelayConfig extends DeviceConfig {
    type: "relay";
    pin: number;
    defaultState?: boolean

}

export interface PIRConfig extends DeviceConfig {
    type: "pir";
    pin: number;
}

