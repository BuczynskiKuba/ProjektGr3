// import { baseStationIcon, carIcon, portableIcon, unknownIcon } from './icons.js';

// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13); // Example coordinates
// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Example function to add markers
function addMarker(coordinatesArray) {
    coordinatesArray.forEach(function(coord) {
        L.marker(coord).addTo(map);
    });
}
function addMarker(coordinatesArray, icon) {
    iconUrl = icon.iconUrl
    coordinatesArray.forEach(function(coord) {
        L.marker(coord).addTo(map);
    });
}
// Example usage
var coordinates = [
    [51.505, -1.09], // London
    [48.8566, 2.3522] // Paris
];
var coordinates2 = [
    [53.505, -0.09], // London
    [48.8566, 20.3522] // Paris
];
var unknown = L.icon({
    iconUrl: '../res/custom-marker.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -41] // point from which the popup should open relative to the iconAnchor
});

addMarker(coordinates)
addMarker(coordinates2, unknown);
