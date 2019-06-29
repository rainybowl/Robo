console.log('hello Universe');

const controls = {
	log: (msg) => console.log(`logging ${msg}`),
  msg: 'no mgs'
};


setTimeout(() => controls.msg = 'msg to Robo', 10000);


module.exports = controls;