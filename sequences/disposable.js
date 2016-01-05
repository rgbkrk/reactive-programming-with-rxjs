var Rx = require('rx');

var counter = Rx.Observable.interval(1000);

var sub1 = counter.subscribe(i => {
  console.log("Subscription 1: ", i);
});

var sub2 = counter.subscribe(i => {
  console.log("Subscription 2: ", i);
});

setTimeout(() => {
  console.log('Cancelling subscription 2!');
  sub2.dispose();
}, 2000);
