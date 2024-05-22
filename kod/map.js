// Initialize the map
var map = L.map('map').setView([50.0276, 19.9821], 11); // Example coordinates
// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Example function to add markers
function addMarkerGeneric(coordinates) {
    let coord = coordinates
    let marker = L.marker(coord).addTo(map);

    return marker
}
function addMarker(coordinates, icon) {
    let coord = coordinates
    let marker = L.marker(coord, { icon: icon }).addTo(map);

    return marker
}

// Example usage

// var example = L.icon({
//     iconUrl: '../res/icons/mapIcons/basestation.png',
//     iconSize: [25, 41], // size of the icon
//     iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
//     popupAnchor: [-3, -41] // point from which the popup should open relative to the iconAnchor
// });
const size = [75,75];
const anchor = [-37,-37];
const popup = [-3,-41];
const baseStationIcon = L.icon({
    iconUrl: '../res/icons/mapIcons/basestationmarker.png',
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: popup
});

const carIcon = L.icon({
    iconUrl: '../res/icons/mapIcons/carmarker.png',
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: popup
});

const portableIcon = L.icon({
    iconUrl: '../res/icons/mapIcons/portablemarker.png',
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: popup
});

//DEBUG
//EXAMPLES
// var coordinates = [51.505, -1.09];
// var coordinates2 = [56.505, -5.09];
// var coordinates3 = [ 26.505, -8.09];
// addMarkerGeneric(coordinates)
// addMarker(coordinates2, example);
// addMarker(coordinates3, carIcon);

