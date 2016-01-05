var Rx = require('rx');

var data = Rx.Observable.interval(1000)
  .scan((prev, curr) => {
    return {
      sum: prev.sum + curr,
      count: prev.count + 1,
    };
  }, { sum: 0, count: 0 })

var avg = data.map(o => o.sum / o.count);
var sum = data.map(o => o.sum);

sum.subscribe(x => {
  console.log('SUM: ', x);
});

avg.subscribe(x => {
  console.log('AVG: ', x);
});
