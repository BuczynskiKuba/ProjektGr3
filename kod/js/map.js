// inicjalizacja mapy 

const map = L.map('map').setView([50.0476, 19.9510], 12);

// doodanie warsty openStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/*
    Marker - klasa tworząca markery zawierające funckje do aktualizacji ich
    lat - wspołrzedna latitude
    lon - współrzedna longtitude
    icon - standardowa ścieżka do pliku ikony
    iconClicked - ścieżka do pliku ikony kliknietej
    elementId - id pojedyńczego rekordu
    elementName - name pojedyńczego rekordu
    elementBattery - stan baterii pojedyńczego rekordu
    elementStrength - stan sygnału pojedyńczego rekordu
*/

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

    /*
        updatePosition() - aktualizuje pozycje markera i markera zdrowia
        lat, lon - nowe wspołrzedne
    */

    updatePosition(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.marker.setLatLng([this.lat, this.lon]);
        this.markerHealth.setLatLng([this.lat, this.lon]);
    }

    /**
     * updateClicked() - funckja aktualizuje marker to klikniecie - jest to potrzebne do połączenia clicka na rekord w tabeli z markerem
     */

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

    /**
     * setIcon() - funckja ustawia obecna ikone markera
     * icon - ścieżka do pliku ikony
     */

    setIcon(icon) {
        this.marker.setIcon(L.icon({
            iconUrl: icon,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, 0]
        }));
    }

    /**
     * onClick() funkcja dziłająca na zdarzenie 'click', zmienia stan markera, podmienia ikone, i aktualizuje zaznaczone urządzenia
     */

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

    /**
     * setHealth() - ustawia zdrowie danego markera
     * zdrowie jest wyliczane na podstawie elementBattery (0 - 100) i elementStrength (0 - 10)
     * zdrowie jest sumą pół na pół powyższych zmniennych elementBattery * 0.5 + elementStrength * 5
     * końcowo otrzymujemy zdrowie w zakresie (0 - 100), (0, 30) - stan słaby kolor czerwony
     * (30, 70) - stan średni kolor żółty, (70 - 100) - stan dobry kolor zielony, 100+ dla urządzeń nieautoryzowanych kolor szary
     * 
     * elementBattery - poziom baterii urządzenia 
     * elementStrength - poziom sygnału urządzenia
     */

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

    /**
     * destroyMarker() - usuwa dany marker z mapy
     */

    destroyMarker(){
        map.removeLayer(this.marker)
        map.removeLayer(this.markerHealth)
    }
}
