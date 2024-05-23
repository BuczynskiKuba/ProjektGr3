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
function addMarker(coordinates, icon, clickedicon, selectedRows, id, name) {
    let markerData = {
        id: id,
        name: name
    };
    let coord = coordinates
    let marker = L.marker(coord, { icon: icon }).addTo(map);
    var isClicked = false;
    marker.on('click', function(e) {
        console.log("click");
        isClicked = !isClicked;
        if (isClicked) {
            console.log("it is clicked");
            marker.setIcon(clickedicon)
            console.log("marker data: " + markerData.id + " " + markerData.name);
        }
        else {
            console.log("it is not clicked");
            marker.setIcon(icon)
        }
    });
    if(selectedRows == id){
        marker.setIcon(clickedicon)
    }
    else {
        marker.setIcon(icon)
    }
    marker.options.customData = markerData;
    return marker
}
class Marker {
    constructor() {
        this.coordinates = coordinates;
        this.icon = icon;
        this.clickedIcon = clickedIcon;
        this.id = id;
        this.name = name;
        this.isClicked = false;
        this.markerData = {
            id: this.id,
            name: this.name
        };
        this.createMarker();
    }
    createMarker(){
        let marker = L.marker(coord, { icon: icon }).addTo(map);
        var isClicked = false;
        marker.on('click', function(e) {
            console.log("click");
            isClicked = !isClicked;
            if (isClicked) {
                console.log("it is clicked");
                marker.setIcon(clickedicon)
                console.log("marker data: " + markerData.id + " " + markerData.name);
            }
            else {
                console.log("it is not clicked");
                marker.setIcon(icon)
            }
        });
        if(selectedRows == id){
            marker.setIcon(clickedicon)
        }
        else {
            marker.setIcon(icon)
        }
        return marker
    }
    moveMarker(){

    }
}
// Example usage

// var example = L.icon({
//     iconUrl: '../res/icons/mapIcons/basestation.png',
//     iconSize: [25, 41], // size of the icon
//     iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
//     popupAnchor: [-3, -41] // point from which the popup should open relative to the iconAnchor
// });

//DEBUG
//EXAMPLES
// var coordinates = [51.505, -1.09];
// var coordinates2 = [56.505, -5.09];
// var coordinates3 = [ 26.505, -8.09];
// addMarkerGeneric(coordinates)
// addMarker(coordinates2, example);
// addMarker(coordinates3, carIcon);

