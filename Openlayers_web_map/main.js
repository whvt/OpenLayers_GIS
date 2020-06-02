window.onload = init;
function init(){
  const map = new ol.Map({
    view: new ol.View({
      center: [3068140.6253183694, 7154008.0711093814],
      zoom: 7,       
      minZoom: 2,
      rotation: 0 
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'js-map'
  })

  const popupContainerElement = document.getElementById('popup-coordinates');
  const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: 'top-right'
  })

  map.addOverlay(popup);

  map.on('dblclick', function(e){
    const clickedCoordinate = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clickedCoordinate);
    popupContainerElement.innerHTML = clickedCoordinate;
  }) 
// DragRotate Interaction
const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly
  })
  map.addInteraction(dragRotateInteraction) 

}

