var quakes = Rx.Observable.create((observer) => {
  window.eqfeed_callback = (response) => {
    observer.onNext(response);
    observer.onCompleted();
  }
  loadJSONP(QUAKE_URL);
}).flatMap((dataset) => {
  return Rx.Observable.from(dataset.features);
})

quakes.subscribe((quake) => {
  var coords = quake.geometry.coordinates;
  var size = quake.properties.mag * 10000;

  L.circle([coords[1], coords[0]], size).addTo(map);
})
