function createMap(earthquakes) {
  
// Create the title layer that will be the background of our map    
let streetmap = L.titleLayer{"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

}
};

//Create a BaseMaps object to hod the layer
let baseMaps = {
    "Street Map": streetmap
};

// Create an overlayMaps object to hold the earthquakes layer
let overlayMaps = {
    "Earthquakes": earthquakes
};

// Create the map object with options
let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 3,
    layers: [streetmap, earthquakes]
});

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

function createMarkers(response) {

    // Pull the "features" property off of response.data
    let features = response.data.features;

    // Initialize an array to hold earthquake markers
    let earthquakeMarkers = [];

    // Loop through the features array
    for (let index = 0; index < features.length; index++) {
        let feature = features[index];

        // For each station, create a marker and bind a popup with the station's name
        let earthquakeMarker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
            .bindPopup("<h3>" + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag + "<h3>");

        // Add the marker to the earthquake array
        earthquakeMarkers.push(earthquakeMarker);
    }

    // Create a layer group made from the earthquake array, pass it into the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
}

// Create the legend control object
let legend = L.control({

