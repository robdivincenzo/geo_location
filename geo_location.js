function init() {

    var map = new OpenLayers.Map('map', {controls: [
        new OpenLayers.Control.TouchNavigation({
            dragPanOptions: {
                kineticDragging: true,
                autoActivate: true,
                interval: 0 // non-zero kills performance on some mobile phones
            }
        })
    ]});
    var GeolocationAPIControl = new OpenLayers.Control.GeolocationAPI({mode: 'position',
        displayPosition: false,
        displayAccuracy: true,
        geolocationOptions: {timeout:30000}});
    map.addControl(GeolocationAPIControl);

    var layer = new OpenLayers.Layer.OSM("OSM");
    // enable delayed tile loading for better performance
    layer.tileLoadingDelay = 300;

    map.addLayers([layer]);

    map.zoomToMaxExtent();

    GeolocationAPIControl.events.register("positioncomputed", GeolocationAPIControl, function(position) {
        document.getElementById("positionInfo").innerHTML = this.getPositionInformation("<BR>");
    });
    GeolocationAPIControl.events.register("positionerror", GeolocationAPIControl, function(errorEvent) {
        switch (errorEvent.error.code) {
            case 0: document.getElementById("positionInfo").innerHTML = "There was an error while retrieving your location."; break;
            case 1: document.getElementById("positionInfo").innerHTML = "The user didn't accept to provide a location"; break;
            case 2: document.getElementById("positionInfo").innerHTML = "The browser was unable to determine your location"; break;
            case 3: document.getElementById("positionInfo").innerHTML = "The browser timed out before retrieving the location."; break;
        }
    });
    GeolocationAPIControl.activate();
}