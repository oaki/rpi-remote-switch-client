import {io} from "socket.io-client";
import {getConfig} from "./config";

const rpio = require("rpio");

const config = getConfig();
console.log("config", config);
const socket = io(config.server.url, {
  query: {
    token: config.server.token,
    type: "raspberry"
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999
});

socket.on("connect", () => {
  console.log("Connected");

  socket.on("setPin", (data) => {
    console.log('setPin', data);
    rpio.write(1, rpio.HIGH);
  })
});

socket.on("disconnect", () => {
  console.log("Disonnected");
});

socket.on("error", (err) => {
  console.error(err);
});