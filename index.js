'use strict';

//var args = process.argv.slice(2);S

// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
})

// Import the interface to Tessel hardware
//const tessel = require('tessel');

// Turn one of the LEDs on to start.
//tessel.led[2].on();

// Blink!
/*setInterval(() => {
  tessel.led[2].toggle();
  tessel.led[3].toggle();
}, 100);

console.log("I'm blinking! (Press CTRL + C to stop)");
*/