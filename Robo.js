const Tessel = require("tessel-io");
const five = require("johnny-five");

/**
* Robo config
* {
*    leds: ["a3", "a4", "a5", "a6", "a7"],
*    buttons: ["a3", "a4", "a5", "a6", "a7"] || [{pin: "a3"}],
*    switches: []
*    motors: [],
*    sensors:[],
*    multi: [],
*    lcds: [],
*    rgbs: [],
*    lights: [],
*          
* }
*/

class Robo {
  constructor(config = {}){
    this.board = new five.Board({
      io: new Tessel(),
      id: 'Robo'
    });

    console.log(config)

    if(config.leds)
      this.leds = new five.Leds(config.leds);
   // this.rgbs = new five.Leds(config.leds);
    if(config.buttons)
      this.buttons = config.buttons.map(pin => new five.Button(pin));

    this.data = config.data || {};

  }

  injectToRepl(data){
    this.board.repl.inject(data);
  }

};


// class roboButton extends five.Button {
//   /**
//   * Config
//   * {
//   *   pin: 'a5',
//   *   robo: (Robo instance),
//   *   holdtime: 1000,
//   *   actions: {
//   *
//   *   }
//   * }
//   *
//   */
//   constructor(config){//TODO make defaults
//     if(typeof config === 'string')
//       config = {
//         pin: config,
//         holdtime: config.holdtime || 1000
//       };

//     super();

//     this.name = config.name || config.pin;
//     this.isOn = false;
//   }



// };


module.exports = Robo;