var Tessel = require("tessel-io");
var five = require("johnny-five");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var led = new five.Led("b5");
  var door = new five.Switch({
    pin: "a3",
    invert: true,
  });

  door.on("open", () => led.on());
  door.on("close", () => led.off());
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
