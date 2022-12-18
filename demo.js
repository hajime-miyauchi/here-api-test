
var apikey = 'R_b_o94sKLYv-2UMxHb44jDn-GECBjCrra-g0m9GC8s';

function showGeoJSONData (map) {
  var reader = new H.data.geojson.Reader('aichi.geojson', {
    style: function (mapObject) {
      if (mapObject instanceof H.map.Polygon) {
        var opacity = 1.0 / 2000 * parseInt(mapObject.data.JINKO, 0);
        
        mapObject.setStyle({
          fillColor: 'rgba(255, 0, 0, ' + opacity + ')',
          strokeColor: 'rgba(255, 0, 0, 0.5)',
          lineWidth: 1
        });
      }
    }, disableLegacyMode: true
  });

  reader.parse();

  map.addLayer(reader.getLayer());
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat:35.18028, lng:136.90667},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

showGeoJSONData(map);
