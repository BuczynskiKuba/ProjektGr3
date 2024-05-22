import L from 'leaflet'; // Ensure Leaflet is imported if you're using ES6 modules

export const baseStationIcon = L.icon({
    iconUrl: '../res/custom-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -41]
});

export const carIcon = L.icon({
    iconUrl: '../res/custom-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -41]
});

export const portableIcon = L.icon({
    iconUrl: '../res/custom-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-3, -41]
});
// var unknown = L.icon({
//     iconUrl: '../res/custom-marker.png',
//     iconSize: [25, 41], // size of the icon
//     iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
//     popupAnchor: [-3, -41] // point from which the popup should open relative to the iconAnchor
// });
