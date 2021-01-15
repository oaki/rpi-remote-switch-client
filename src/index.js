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

const ripSensorPin = 19;

socket.on("connect", () => {
  console.log("Connected");

  /*
 * Configure the pin for input, and enable the internal pullup resistor which
 * pulls the current high.  Pushing the button connects the pin to ground and
 * pulls it low.  We poll for state changes and print a message when it does.
 */
  rpio.open(ripSensorPin, rpio.INPUT, rpio.PULL_UP);

  rpio.poll(ripSensorPin, (cbpin) => {
    socket.emit("pinChanged", {
      pin: cbpin,
      state: rpio.read(cbpin)
    });
    console.log("Button event on P%d (button currently %s)", cbpin, rpio.read(cbpin));
  });

  socket.on("setPin", (data) => {
    console.log("setPin", data);
    rpio.write(data.pin, data.state ? rpio.HIGH : rpio.LOW);
  })
});

socket.on("disconnect", () => {
  console.log("Disonnected");
  rpio.close(ripSensorPin, rpio.INPUT);
});

socket.on("error", (err) => {
  console.error(err);
});