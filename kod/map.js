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
// function addMarker(coordinatesArray, iconType) {
//     // Use the iconType to get the correct icon from the mapping object
//     const icon = iconMapping[iconType];

//     coordinatesArray.forEach(function(coord) {
//         L.marker(coord, {icon: icon}).addTo(map);
//     });
// }