var Tessel = require("tessel-io");
var five = require("johnny-five");

var utils = require('./utils.js');

const {
  existsInArray,
  getRandomIndex
} = utils;

var board = new five.Board({
  io: new Tessel()
});

var isOn = false;
var modes = ['static', 'random',/* 'odd_or_even',*/ 'one_by_one', 'increase', 'meet_and_depart'];
var activeMode = 0;

board.on("ready", () => {
  var button = new five.Button("a2");
 // var led = new five.Led("a5");
 var leds = new five.Leds(["b0", "b1", "b2", "b3", "b4", "b5", "b5", "b7", "a7" ]);
    count = leds.length,
    time = 1000;

  var spdt = new five.Switch("a5");
  spdt.on("close", () => {
    console.log("Let it be Darkness.");
      isOn = false;
     leds.stop().off();
  });
  spdt.on("open", () =>{
      console.log("Let it be Light!");
      leds.stop().off();
      isOn = true;

    switch(modes[activeMode]){
        case 'static':
          leds.on();
          break;
        case 'random':
            var prevIndex = Math.floor(Math.random()*count);

            board.loop(time, () => {
              if(isOn && modes[activeMode] === 'random'){
                var randomIndex = getRandomIndex(prevIndex, count);
                leds.off();
                leds[randomIndex].on();
                prevIndex = randomIndex;
              };
            });
          break;
        // case 'odd_or_even':
        //   leds.stop().off();
        //   break;
        case 'one_by_one':
           var index = 0,
            step = 1;

            board.loop(time, () => {
              if(isOn && modes[activeMode] === 'one_by_one'){
                leds.off();
                leds[index].on();
                index += step;
                if (index === 0 || index === count-1)
                  step *= -1;
              };
            });
          break;
        case 'increase':
          var index = 0,
            step = 1;

          board.loop(time, () => {
            if(isOn && modes[activeMode] === 'increase'){
              leds.off();
              leds.slice(0, index).on();

              index += step;
              if (index === 0 || index === count)
                step *= -1;
            };
          });
          break;
        case 'meet_and_depart':
          var index = 0;

          board.loop(time, () => {
            if(isOn && modes[activeMode] === 'increase'){
              leds.off();
              leds.slice(0, index).on();
              leds.slice(count-index).on();
              index > Math.floor(count/2) ? index = 0 : index ++;
            }
          });
          break;

        default:
         leds.on();
         break;
      };
  });

  button.on("release", () => {
  	// isOn = !isOn;
  //	board.info("isOn", isOn);

    activeMode = activeMode === modes.length-1 ? 0 : activeMode+1;
    board.info("mode", modes[activeMode]);


    switch(modes[activeMode]){
        case 'static':
          leds.on();
          break;
        case 'random':
            var prevIndex = Math.floor(Math.random()*count);

            board.loop(time, () => {
              if(isOn && modes[activeMode] === 'random'){
                var randomIndex = getRandomIndex(prevIndex, count);
                leds.off();
                leds[randomIndex].on();
                prevIndex = randomIndex;
              };
            });
          break;
        // case 'odd_or_even':
        //   leds.stop().off();
        //   break;
        case 'one_by_one':
           var index = 0,
            step = 1;

            board.loop(time, () => {
              if(isOn && modes[activeMode] === 'one_by_one'){
                leds.off();
                leds[index].on();
                index += step;
                if (index === 0 || index === count-1)
                  step *= -1;
              };
            });
          break;
        case 'increase':
          var index = 0,
            step = 1;

          board.loop(time, () => {
            if(isOn && modes[activeMode] === 'increase'){
              leds.off();
              leds.slice(0, index).on();

              index += step;
              if (index === 0 || index === count)
                step *= -1;
            };
          });
          break;
        case 'meet_and_depart':
          var index = 0;

          board.loop(time, () => {
            if(isOn && modes[activeMode] === 'increase'){
              leds.off();
              leds.slice(0, index).on();
              leds.slice(count-index).on();
              index > Math.floor(count/2) ? index = 0 : index ++;
            }
          });
          break;

        default:
         leds.on();
         break;
      };




  	//led[isOn ? 'on' : 'off']();

    //switch(mode){
    //   case 'static':
    //     isOn ? leds.on() : leds.stop().off();
    //     break;
    //   default:
    //    isOn ? leds.on() : leds.stop().off();
    //    break;
    // }
  	
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