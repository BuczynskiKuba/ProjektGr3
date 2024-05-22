// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13); // Example coordinates
// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Example function to add markers
function addMarkerGeneric(coordinatesArray) {
    coordinatesArray.forEach(function(coord) {
        L.marker(coord).addTo(map);
    });
}
function addMarker(coordinatesArray, icon) {
    iconUrl = icon.iconUrl
    coordinatesArray.forEach(function(coord) {
        L.marker(coord, { icon: icon }).addTo(map);
    });
}
// Example usage
var coordinates = [
    [51.505, -1.09], // London
    [48.8566, 2.3522] // Paris
];
var coordinates2 = [
    [56.505, -5.09], // London
    [43.8566, 10.3522] // Paris
];
var coordinates3 = [
    [26.505, -8.09], // London
    [47.8566, 15.3522] // Paris
];
var example = L.icon({
    iconUrl: '../res/icons/type/basestation.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -41] // point from which the popup should open relative to the iconAnchor
});
const baseStationIcon = L.icon({
    iconUrl: '../res/icons/type/basestation.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -41]
});

const carIcon = L.icon({
    iconUrl: '../res/icons/type/car.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -41]
});

const portableIcon = L.icon({
    iconUrl: '../res/icons/type/portable.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -41]
});

addMarkerGeneric(coordinates)
addMarker(coordinates2, example);
addMarker(coordinates3, carIcon);

