var quakes = Rx.DOM.jsonpRequest({
  url: QUAKE_URL,
  jsonpCallback: 'eqfeed_callback',
})
.flatMap((dataset) => {
  return Rx.Observable.from(dataset.response.features);
})
.map((quake) => {
  return {
    lat: quake.geometry.coordinates[1],
    lng: quake.geometry.coordinates[0],
    size: quake.properties.mag * 10000,
  };
})

quakes.subscribe((quake) => {
  L.circle([quake.lat, quake.lng], quake.size).addTo(map);
})
