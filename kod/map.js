// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13); // Example coordinates
// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example function to add markers
function addMarkers(coordinatesArray) {
    coordinatesArray.forEach(function(coord) {
        L.marker(coord, {icon: icon}).addTo(map);
    });
}
// Example usage
// var coordinates = [
//     [51.505, -0.09], // London
//     [48.8566, 2.3522] // Paris
// ];
// var coordinates2 = [
//     [53.505, -0.09], // London
//     [48.8566, 20.3522] // Paris
// ];
// addMarkers(coordinates2);