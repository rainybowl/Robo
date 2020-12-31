var five = require("johnny-five");
var Tessel = require("tessel-io");
var Robo = require("./Robo");

const types = {
  Flash: 0,
  Pause: 1
};

const lighthouse = {
  name: 'Cape Palliser',
  coordinates: '41°37′S 175°17′E',
  url: 'http://www.lighthousedigest.net/Digest/database/uniquelighthouse.cfm?value=1163',
  built: 1897,
  description: 'Two white flashes every 20 seconds, visible for 26 nautical miles.',
  period: [
   {
      type: types.Flash,
      color: '#FFFFFF',
      time: 800,
    },
    {
      type: types.Pause,
      time: 150
    },

    {
      type: types.Flash,
      color: '#FFFFFF',
      time: 800,
    },

    {
      type: types.Pause,
      time: 18000/3
    }
  ]
};

const robo = new Robo({
  leds: ["a3"],
  buttons: ["a2"],
  data: {
    isOn: false
  }
});

const turnTheLight = led => {

  const handleResolve = data => {
    if(!robo.data.isOn)
      return;

    //console.log('current ', data);

    const index =  lighthouse.period.length === data.index+1 ? 0 : data.index+1,
          next = lighthouse.period[index],
          nextPromise = new Promise(resolve => setTimeout(() => resolve(Object.assign(next, {index})), next.time));

   // console.log('next ', next);

   next.type === types.Flash ? led.on() : led.off();

  // next.type === types.Flash ? led.fadeIn(next.time/2, () => led.fadeOut(next.time/2)) : led.off();
   // if(next.type === types.Flash){
   //  led.fade({
   //    easing: "linear",
   //    duration: next.time,
   //    // cuePoints: [0, 0.5, 1],
   //    // keyFrames: [0, 250, 0],
   //      cuePoints: [0, 0.1, 0.5, 0.9, 1],
   //  keyFrames: [0, 250, 250, 250, 0],
   //    onstop() {
   //      console.log("Animation stopped");
   //      led.off()
   //    }
   //  });
   // }
   // else
   //  led.off();

    nextPromise.then(handleResolve);
  };

  const first = new Promise(resolve => setTimeout(() => resolve(Object.assign(lighthouse.period[0], {index: 0})), lighthouse.period[0].time));

  lighthouse.period[0].type === types.Flash ? led.on() : led.off();
 //  const { time } = lighthouse.period[0];
 // // led.fadeIn(time/2, () => led.fadeOut(time/2));
 //  led.fade({
 //    easing: "linear",
 //    duration: time,
 //    cuePoints: [0, 0.1, 0.5, 0.9, 1],
 //    keyFrames: [0, 250, 250, 250, 0],
 //    // cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
 //    // keyFrames: [0, 250, 250, 250, 250, 0],
 //    onstop() {
 //      console.log("Animation stopped");
 //      led.off()
 //    }
 //  });

  first.then(handleResolve);
};

robo.board.on("ready", () => {

  const led = robo.leds[0],
        button = robo.buttons[0];

  button.on("release", () => {
    robo.data.isOn = !robo.data.isOn;
    robo.data.isOn ? turnTheLight(led) : led.off();
  });

});


 // const prom = lighthouse.period.map((item, index) => {
//   return {
//     data: item,
//     promise: () => new Promise(resolve => setTimeout(() => resolve(Object.assign(item, {index})), item.time))
//   };
// });

// async function runSequence(promises) {
//   for (let promise of promises){
//     console.log('resolving...', promise.data);
//     console.log(await promise.promise());
//   };
// };

// runSequence(prom);
