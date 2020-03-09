
console.log('hello Universe');

import io from 'socket.io-client';

//import speed from '../fly.js';

const socket = io('http://0.0.0.0:8080/');

console.log(socket)

 socket.on("report", function (data) {
  	console.log(data)
  });


socket.emit("report", {hello: true})
