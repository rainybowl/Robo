// var http = require("http");
// var os = require("os");
// var path = require("path");

// var Express = require("express");
// var SocketIO = require("socket.io");

// var app = new Express();
// var server = new http.Server(app);
// // var io = new SocketIO(server);

// app.use(Express.static(path.join(__dirname, "/soilapp")));
// app.use("/vendor", Express.static(__dirname + "/node_modules/"));




// var Tessel = require("tessel-io");
// var five = require("johnny-five");
// var board = new five.Board({
//   io: new Tessel()
// });

// board.on("ready", () => {
//   var dryLamp = new five.Led("b7"),
//       soil = new five.Sensor("a7");

//   board.repl.inject({
//     soil,
//     dryLamp
//   });

//   //console.log(soil.value)

//   dryLamp.off();

//   console.log(os.cpus());

//   soil.on("change", () => {
//     /*
//       Condition   Low   High
//       ----------------------
//       Dry           0    300
//       Damp        300    700
//      */
//     console.log(soil.value);
//     dryLamp[soil.value < 300 ? 'on' : 'off']();
//   });

//   var port = 3000;

//   server.listen(port, () => {
//     console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
//   });

//   process.on("SIGINT", () => {
//     server.close();
//   });

// });


var http = require("http");
var os = require("os");
var path = require("path");

var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

var Express = require("express");
var SocketIO = require("socket.io");

var app = new Express();
var server = new http.Server(app);
var io = new SocketIO(server);

app.use(Express.static(path.join(__dirname, "/app")));
app.use("/vendor", Express.static(__dirname + "/node_modules/"));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

let startTime = Date.now();

board.on("ready", () => {
 
  // monitor.on("change", () => {
  //   var now = Date.now();
  //   if (now - updated >= 5000) {
  //     updated = now;

  //     clients.forEach(recipient => {
  //       recipient.emit("report", {
  //         thermometer: monitor.thermometer.celsius,
  //         barometer: monitor.barometer.pressure,
  //         hygrometer: monitor.hygrometer.relativeHumidity,
  //         altimeter: monitor.altimeter.meters,
  //       });
  //     });
  //   }
  // });

  // io.on("connection", socket => {
  //   // Allow up to 5 monitor sockets to
  //   // connect to this enviro-monitor server
  //   if (clients.size < 5) {
  //     clients.add(socket);
  //     // When the socket disconnects, remove
  //     // it from the recipient set.
  //     socket.on("disconnect", () => clients.delete(socket));
  //   }
  // });


  var dryLamp = new five.Led("b7"),
    soil = new five.Sensor("a7");

  board.repl.inject({
    soil,
    dryLamp
  });

  //console.log(soil.value)

  dryLamp.off();

  console.log(os.cpus());

  soil.on("change", () => {
    /*
      Condition   Low   High
      ----------------------
      Dry           0    300
      Damp        300    700
     */
   // console.log(soil.value);
    dryLamp[soil.value < 300 ? 'on' : 'off']();

    if(Date.now() - startTime >= 5000){
      io.emit("message", soil.value);
      startTime = Date.now();
    };
    

  });

 io.on('connection', function(socket){
  console.log('a user connected');
   socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});




  var port = 3000;
  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}/soil`);
  });

  process.on("SIGINT", () => {
    server.close();
  });
});
