var Tessel = require("tessel-io");
var five = require("johnny-five");

var board = new five.Board({
  io: new Tessel(),
  id: 'main-board'
});

board.on("ready", () => {
  var led = new five.Led("a5");
 // led.blink(500);

  /*
    Injecting object into the REPL
    allow access while the program
    is running. 
    
    Try these in the REPL: 
    
    led.on();
    led.off();
    led.blink();

    (One at a time to see each action)
  */
  board.repl.inject({
    led
  });

  //  this.repl.inject({
  //   // Allow limited on/off control access to the
  //   // Led instance from the REPL.
  //   on: function() {
  //     led.on();
  //   },
  //   off: function() {
  //     led.off();
  //   }
  // });

});
