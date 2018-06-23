var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

var utils = require('./utils.js');

const {
  existsInArray,
  getRandomIndex
} = utils;

//const tessel = require('tessel');

//console.log(process.argv);
//console.log(process.env)

board.on("ready", () => {

  var pins_array = ["a3", "a4", "a5", "a6", "a7"],
      count = pins_array.length,
      mode = 'meet_and_depart',
      time = 1000,
      leds = new five.Leds([...pins_array]);

    switch(mode){
      case 'random':
        var prevIndex = Math.floor(Math.random()*count);

        board.loop(time, () => {
          var randomIndex = getRandomIndex(prevIndex, count);
          leds.off();
          leds[randomIndex].on();
          prevIndex = randomIndex;
        });
      break;

      case 'odd_or_even':
        var ledTypes = {
          even: [...pins_array].filter((led, index) => index !== 0 && index%2 !== 0),
          odd: [...pins_array].filter((led, index) => index === 0 || index%2 === 0)
        },
        currentState = 'odd'; 

        board.loop(time, () => {
          leds.off();
          [...pins_array].forEach((led, index) => {
            if(existsInArray(led,ledTypes[currentState]))
              leds[index].on();
          });
          currentState = currentState === 'odd' ? 'even' : 'odd';
        });

      break;
      
      case 'one_by_one':
        var index = 0,
            step = 1;

        board.loop(time, () => {
          leds.off();
          leds[index].on();
          index += step;
          if (index === 0 || index === count-1)
            step *= -1;
        });
      break;

      case 'increase':
        var index = 0,
            step = 1;

        board.loop(time, () => {
          leds.off();
          leds.slice(0, index).on();

          index += step;
          if (index === 0 || index === count)
            step *= -1;
        });
      break;

      case 'meet_and_depart':
        var index = 0;

        board.loop(time, () => {
          leds.off();
          leds.slice(0, index).on();
          leds.slice(count-index).on();
          index > Math.floor(count/2) ? index = 0 : index ++;
        });
      break;

      default:
      break;
    }
});
