var quakes = Rx.Observable.create((observer) => {
  window.eqfeed_callback = (response) => {
    response.features.forEach((quake) => {
      observer.onNext(quake);
    });
  }
  loadJSONP(QUAKE_URL);
});
quakes.subscribe((quake) => {
  var coords = quake.geometry.coordinates;
  var size = quake.properties.mag * 10000;

  L.circle([coords[1], coords[0]], size).addTo(map);
})
