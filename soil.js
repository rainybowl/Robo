var Tessel = require("tessel-io");
var five = require("johnny-five");

var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var dry = new five.Led("b7");
//  var both = new five.Leds([dry, wet]);
  var soil = new five.Sensor("a7");

  board.repl.inject({
    soil,
    dry
  });

  console.log(soil.value)

  dry.off();

  soil.on("change", () => {
    /*
      Condition   Low   High
      ----------------------
      Dry           0    300
      Damp        300    700
     */
    // if (wet.isOn && soil.value < 300) {
    //   both.toggle();
    // } else {
    //   if (dry.isOn && soil.value > 300) {
    //     both.toggle();
    //   }
    // }

  //  console.log(soil.value)

    dry[soil.value < 300 ? 'on' : 'off']();
    //   dry.on()
    // else
    //   dry.off();

  });
});
