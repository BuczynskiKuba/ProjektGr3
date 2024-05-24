// Initialize the map
const map = L.map('map').setView([50.0276, 19.9821], 11);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

class Marker {

    constructor(lat, lon, icon, iconClicked, elementId, elementName) {
        this.map = map;
        this.lat = lat;
        this.lon = lon;
        this.icon = icon;
        this.iconClicked = iconClicked;
        this.clicked = false;
        this.elementId = elementId;
        this.elementName = elementName;

        this.marker = L.marker([this.lat, this.lon], {
            icon: L.icon({
                iconUrl: this.icon,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, 0]
            })
        }).addTo(this.map);

        this.marker.on('click', () => this.onClick());
    }

    updatePosition(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.marker.setLatLng([this.lat, this.lon]);
    }

    updateClicked(){

        let clicked = false;

        for( let i = 0; i < selectedDevices.length; i++){
            if (selectedDevices[i] == this.elementId){
                this.clicked = true
                this.setIcon(this.iconClicked)
                clicked = true;
                break;
            }
        }

        if(clicked == false){
            this.clicked = false
            this.setIcon(this.icon)
        }

    }

    setIcon(icon) {
        this.marker.setIcon(L.icon({
            iconUrl: icon,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, 0]
        }));
    }

    onClick() {
        // Placeholder for click handling logic.
        console.log('Marker clicked: ', this.elementName );
        // Example: Change icon on click

        if(this.clicked){
            this.clicked = false;
            this.setIcon(this.icon)
            updateSelectedDevices(this.elementId, true)
        }else{
            this.clicked = true;
            this.setIcon(this.iconClicked)
            updateSelectedDevices(this.elementId);
        }

    }
}
