var quakes = Rx.Observable
  .interval(5000)
  .flatMap(() => {
    return Rx.DOM.jsonpRequest({
      url: QUAKE_URL,
      jsonpCallback: 'eqfeed_callback',
    }).retry(3);
  })
  .flatMap((result) => {
    return Rx.Observable.from(result.response.features);
  })
  .distinct(quake => quake.properties.code)
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
