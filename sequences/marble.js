var Rx = require('rx');

var avg = Rx.Observable.range(0, 5)
  .reduce((prev, curr) => {
    return {
      sum: prev.sum + curr,
      count: prev.count + 1,
    };
  }, { sum: 0, count: 0 })
  .map(o => o.sum / o.count);

var subscription = avg.subscribe(x => {
  console.log('Average is: ', x);
});
