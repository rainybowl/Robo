

const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');
var os = require("os");


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    };

    res.writeHead(200);
    res.end(data);
  });
};


const mongo = require('mongodb').MongoClient;

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);

    io.on("connection", socket => {
      console.log(socket)
      socket.emit("message", 'connected');

      mongo.connect('mongodb://127.0.0.1/mongotest', function(err, client){
        if(err){
            throw err;
        }

        console.log('MongoDB connected...');
        const db = client.db('test');
        const items = db.collection('items');


        socket.on('input', function(data){
          console.log(data)

          items.insertOne({data}, function(){
        
            items.find({})
              .toArray()
              .then((data) => {
                console.log(data);
                socket.emit('update', data);
              }).catch((err) => {
                console.log(err);
              });

          })

        });

      });

    });

 


});

// // const mongo = require('mongodb').MongoClient;
// // const socket = require('socket.io').listen(5000).sockets;

// // console.log(mongo, socket)





// // var http = require("http");
// // var os = require("os");
// // var path = require("path");


// // var Express = require("express");
// // var SocketIO = require("socket.io");

// // var app = new Express();
// // var server = new http.Server(app);
// // var io = new SocketIO(server);

// // app.use(Express.static(path.join(__dirname, "/app")));
// // app.use("/vendor", Express.static(__dirname + "/node_modules/"));

// // app.get('/', function(req, res){
// //   console.log()
// //   res.sendFile(__dirname + '/index.html');
// // });


// // var port = process.env.PORT || 3000;


// // const mongo = require('mongodb').MongoClient;
// // //const socket = require('socket.io').listen(port).sockets

// //   io.on('input', function(data){
// //       console.log(data)

    

// //     });

// // server.listen(port, () => {
// //   console.log(port);

// //   console.log(typeof io.emit)
// //   //io.emit('message', 'connected')

// //   // mongo.connect('mongodb://127.0.0.1/mongotest', function(err, client){
// //   //   if(err){
// //   //       throw err;
// //   //   }

// //   //   console.log('MongoDB connected...');
// //   //   const items = client.db('items');

// //   //   io.emit('message', 'connected')

// //   //   io.on('input', function(data){
// //   //     console.log(data)

// //   //     items.insert({data}, function(){
// //   //       console.log(items)
// //   //     })

// //   //   });

// //   // });



// // });



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















// var http = require("http");
// var os = require("os");
// var path = require("path");


// var Express = require("express");
// var SocketIO = require("socket.io");

// var app = new Express();
// var server = new http.Server(app);
// var io = new SocketIO(server);

// app.use(Express.static(path.join(__dirname, "/app")));
// app.use("/vendor", Express.static(__dirname + "/node_modules/"));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// let startTime = Date.now();


  




//   var port = 5000;
//   server.listen(port, () => {
//     console.log(port);

//      io.on("connection", socket => {
//       console.log(socket)
//       socket.emit("message", 'connected');
//      })
    
//   });

//   process.on("SIGINT", () => {
//     server.close();
//   });





