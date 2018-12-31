var Tessel = require("tessel-io");
var five = require("johnny-five");

var board = new five.Board({
  io: new Tessel()
});

var isOn = false;

board.on("ready", () => {
  var button = new five.Button("a2");
  var led = new five.Led("a5");

  button.on("release", () => {
  	isOn = !isOn;
  	board.info("isOn", isOn);
  	//led[isOn ? 'on' : 'off']();
  	isOn ? led.on() : led.stop().off();
  });

 // button.on("release", () => console.log("Button Released!"));

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
