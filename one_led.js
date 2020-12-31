



var Tessel = require("tessel-io");

var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});


const Robo = require('./Robo.js');

var robo = require('./test_robo.js');

const {
  logText
} = robo;


logText('some text');

var board = new five.Board({
  io: new Tessel(),
  id: 'main-board'
});


var server = require('./test_robo/server.js');

const {
  app, io
} = server;



// var http = require("http");
// var os = require("os");
// var path = require("path");

// console.log(`http://${os.networkInterfaces().wlan0[0].address}:`);

// const robo = new Robo();

// console.log(robo)


            // // use your socket
            // socket.on("message", (message) => {
            //   console.log(message)
            //     // do something with the message.
            // })



;
};


board.on("ready", () => {

  app.listen(80);

// const sockets = [];

// const emitMessage = message => {
//   console.log(sockets)
//   sockets[0].emit('message', message)
// };

io.on('connection', socket => {

  // sockets.push(socket);

  console.log('connected')

  socket.emit('message', { connected: 'YES!' });
  socket.on('test', (data) => {
    console.log(data);
  });
});

  // const sockets = [];

  // io.on('connection', socket => {

  //   sockets.push(socket);

  //   console.log(sockets)

  //   socket.emit('message', { connected: 'YES!' });
  //   socket.on('test', (data) => {
  //     console.log(data);
  //   });

  //   socket.emit('test', 'true')
  // });


  // app.listen(80);



 // emitMessage('message from Robo')
  
//sockets[0].emit('test', {robo: 'is here'})

 // var led = new five.Led("a5");
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
  // board.repl.inject({
  //   led
  // });

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
