export default class DeviceNotFoundError extends Error {
    constructor(type: string, id: number) {
        super(`Device of type ${type} with ID ${id} was not found.`);
    }
}