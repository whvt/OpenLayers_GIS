window.onload = init;

function init(){
  // Controls  
  const mousePositionControl = new ol.control.MousePosition();
  const overViewMapControl = new ol.control.OverviewMap({
    collapsed: false,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()      
      })
    ]
  });
  const scaleLineControl = new ol.control.ScaleLine();
  const zoomSliderControl = new ol.control.ZoomSlider();
  const zoomToExtentControl = new ol.control.ZoomToExtent();

  const map = new ol.Map({
    view: new ol.View({
      center: [3068140.6253183694, 7154008.0711093814],
      zoom: 6, 
      maxZoom: 10,
      minZoom: 1,
      rotation: 0
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'js-map',
    keyboardEventTarget: document,
    controls: ol.control.defaults().extend([      
      mousePositionControl,
      overViewMapControl,
      scaleLineControl,
      zoomSliderControl,
      zoomToExtentControl
    ])
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

  /* const drawInteraction = new ol.interaction.Draw({
    type: 'Polygon',
    freehand: true
  })
  map.addInteraction(drawInteraction);

  drawInteraction.on('drawend', function(e){
    let parser = new ol.format.GeoJSON();
    let drawnFeatures = parser.writeFeatures([e.feature]);
    console.log(drawnFeatures);
  }) */
}


