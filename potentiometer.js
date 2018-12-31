// var view = require('./viewmodel.js');

// const {
//   roboView
// } = view;


var Barcli = require("barcli");
var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel(),
  repl: false,
  debug: false,
});

board.on("ready", function() {
  //var range = [0, 100];
  // var graph = new Barcli({
  //   label: "Knob turning",
  //   range: range,
  // });

  var sensor = new five.Sensor({
    pin: "a7",
    threshold: 2
  });


  var led = new five.Led("b5");

  sensor.on("change", () => {
    board.info("Sensor value", sensor.value);
    led.brightness(sensor.scaleTo(0, 255));
  });

  // sensor.on("change", () => {
  //   graph.update(sensor.scaleTo(range));
  // });

 // setInterval(() => roboView.roboValue(Date.now()), 2000)
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