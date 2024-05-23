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
// function addMarker(coordinates, icon, clickedicon, selectedRows, id, name) {
//     let markerData = {
//         id: id,
//         name: name
//     };
//     let coord = coordinates
//     let marker = L.marker(coord, { icon: icon }).addTo(map);
//     var isClicked = false;
//     marker.on('click', function(e) {
//         console.log("click");
//         isClicked = !isClicked;
//         if (isClicked) {
//             console.log("it is clicked");
//             marker.setIcon(clickedicon)
//             console.log("marker data: " + markerData.id + " " + markerData.name);
//         }
//         else {
//             console.log("it is not clicked");
//             marker.setIcon(icon)
//         }
//     });
//     if(selectedRows == id){
//         marker.setIcon(clickedicon)
//     }
//     else {
//         marker.setIcon(icon)
//     }
//     marker.options.customData = markerData;
//     return marker
// }
class Marker {
    constructor(coordinates, icon, clickedIcon, id, name) {
        this.coordinates = coordinates;
        this.icon = icon;
        this.clickedIcon = clickedIcon;
        this.markerData = {
            id: id,
            name: name
        };
        this.isClicked = false;
        this.marker = this.createMarker();
    }

    createMarker() {
        let marker = L.marker(this.coordinates, { icon: this.icon }).addTo(map);
        marker.on('click', this.handleClick.bind(this));

        if (this.selectedRows === this.markerData.id) {
            marker.setIcon(this.clickedIcon);
        } else {
            marker.setIcon(this.icon);
        }

        marker.options.customData = this.markerData;
        return marker;
    }
    handleClick() {
        console.log("click");
        this.isClicked = !this.isClicked;
        if (this.isClicked) {
            console.log("it is clicked");
            this.marker.setIcon(this.clickedIcon);
            console.log("marker data: " + this.markerData.id + " " + this.markerData.name);
        } else {
            console.log("it is not clicked");
            this.marker.setIcon(this.icon);
        }
    }
    updateMarker(coordinates){
        this.marker.setLatLng(coordinates)
    }
    destroyMarker(){
        this.marker.remove();
    }
    getMarker() {
        return this.marker;
    }
}

// let myMarker = new Marker(coordinates, icon, clickedIcon, selectedRows, id, name);
// let marker = myMarker.getMarker();
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

