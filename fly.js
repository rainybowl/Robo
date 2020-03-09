
import { Board } from './node_modules/johnny-five';

var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

const speed = 128;

board.on("ready", () => {

  var motor = new five.Motor([ "a5", "a4", "a5" ]),
      button = new five.Button("b2");

  let buttonState = button.isOn;

  //[ pwm, dir, cdir ]
  // var motor = new five.Motor({
  //   pins: {
  //     pwm: "a5",
  //     dir: "a4",
  //     cdir: "a3",
  //   }
  // });

  board.repl.inject({
    motor,
    button
  });

  button.on("release", () => {
    buttonState = !buttonState;
    console.log("Button state: ", buttonState);

    // if(buttonState){
    //   motor.forward(speed);
    // }
    // else{
    //   motor.stop();
    // };

    if(buttonState && !motor.isOn)
      motor.forward(speed);
    else if(!buttonState && motor.isOn)
      motor.stop();

  });

});

export default speed



