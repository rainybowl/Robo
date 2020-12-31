var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});


/**
*
  RS    EN    D4    D5    D6    D7
["a2", "a3", "a4", "a5", "a6", "a7"]
*/


board.on("ready", () => {
  var lcd = new five.LCD({
    pins: ["a2", "a3", "a4", "a5", "a6", "a7"]
  });

  lcd.cursor(0, 0).print("I am glad");
  lcd.cursor(1, 0).print("I found you!");
  // let len = 'I am glad'.length;

  // while(len){
  // 	setTimeout(() => {
  // 		lcd.cursor(0, 0).print("I am glad".slice(0, i));
  // 			len -= 1;
  // 	}, 500)
  // }
  	

});
