// Initialize the map
const map = L.map('map').setView([50.0276, 19.9821], 11);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

class Marker {

    constructor(lat, lon, icon, iconClicked, elementId, elementName, elementBattery, elementStrength) {
        this.map = map;
        this.lat = lat;
        this.lon = lon;
        this.icon = icon;
        this.iconClicked = iconClicked;
        this.clicked = false;
        this.elementId = elementId;
        this.elementName = elementName;
        this.elementBattery = elementBattery;
        this.elementStrength = elementStrength;
        this.markerHealth = null;


        this.marker = L.marker([this.lat, this.lon], {
            icon: L.icon({
                iconUrl: this.icon,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, 0]
            })
        }).addTo(this.map);

        this.setHealth(this.elementBattery, this.elementStrength);

        this.marker.on('click', () => this.onClick());
    }

    updatePosition(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.marker.setLatLng([this.lat, this.lon]);
        this.markerHealth.setLatLng([this.lat, this.lon]);
    }

    updateClicked(){

        this.clicked = false;

        for( let i = 0; i < selectedDevices.length; i++){
            if (selectedDevices[i] == this.elementId){
                this.clicked = true
                this.setIcon(this.iconClicked)
                this.clicked = true;
                break;
            }
        }

        if(this.clicked == false){
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

    setHealth(elementBattery, elementStrength) {

        this.elementBattery = elementBattery;
        this.elementStrength = elementStrength;

        if (this.markerHealth){
            map.removeLayer(this.markerHealth)
        }

        let health = 0;

        health += this.elementBattery * 0.5;
        health += this.elementStrength * 5;

        if( health >= 0 && health < 30){
            this.markerHealth = L.marker([this.lat, this.lon], {
                icon: L.divIcon({
                    className: 'health',
                    html: '<button style ="color: red; background-color: red;" >I</button>'
                })
            }).addTo(this.map);
        }else if (health >= 30 && health < 70){
            this.markerHealth = L.marker([this.lat, this.lon], {
                icon: L.divIcon({
                    className: 'health',
                    html: '<button style ="color: yellow; background-color: yellow;" >I</button>'
                })
            }).addTo(this.map);
        }else if (health >= 70 && health <= 100){
            this.markerHealth = L.marker([this.lat, this.lon], {
                icon: L.divIcon({
                    className: 'health',
                    html: '<button style ="color: green; background-color: green;" >I</button>'
                })
            }).addTo(this.map);
        }else{
            this.markerHealth = L.marker([this.lat, this.lon], {
                icon: L.divIcon({
                    className: 'health',
                    html: '<button style ="color: gray; background-color: gray;" >I</button>'
                })
            }).addTo(this.map);
        }
    }

    destroyMarker(){
        map.removeLayer(this.marker)
        map.removeLayer(this.markerHealth)
    }
}
