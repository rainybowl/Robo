var Tessel = require("tessel-io");
var five = require("johnny-five");

var utils = require('./utils.js');


var board = new five.Board({
  io: new Tessel()
});

var controls = require('./src/index.js');

let mode = 1;

board.on("ready", () => {

  const button = new five.Button("a2");
  const led = new five.Led("a5");
// var leds = new five.Leds(["b0", "b1", "b2", "b3", "b4", "b5", "b5", "b7", "a7" ]);

  board.loop(5000, () => {
    controls.log(controls.msg);
  });

 
  

  button.on("release", () => {
  	
  });


});


board.on("info", function(event) {
  /*
    Event {
      type: "info"|"warn"|"fail",
      timestamp: Time of event in milliseconds,
      class: name of relevant component class,
      message: message [+ ...detail]
    }
  */
  console.log("%s sent an 'info' message: %s", event.class, event.message);
});