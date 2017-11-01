import rpio = require("rpio");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io-client');

const config = require("./config.ts").config();
const socket = io(config.server.url);
console.log('Server url:', config.server.url);

socket.on('connect', () => {
    console.log("Connected");
});

socket.on('setPin', (data) => {
    console.log(`Relay ${data.relay} was switched ${data.state ? "ON" : "OFF"}`);
    rpio.write(1, rpio.HIGH);
});

socket.on('disconnect', () => {
    console.log("Disonnected");
});

socket.on('error', (err: Error) => {
    console.error(err);
});

socket.connect();
console.log("Connecting");