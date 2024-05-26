//generator markerów
const markersGenerator = (data) => {
    clearMarkers();
    data.forEach(element => {
        var elementPos = [element.Position.Lat, element.Position.Lon]
        let icon;
        let iconClicked;
        switch(element.Type){
            case "Portable":
                icon = 'res/icons/mapIcons/portablemarker.png';
                iconClicked = 'res/icons/mapIcons/portablemarkerclicked.png';
                break;
            case "Car":
                icon = 'res/icons/mapIcons/carmarker.png';
                iconClicked = 'res/icons/mapIcons/carmarkerclicked.png';
                break;
            case "BaseStation":
                icon = 'res/icons/mapIcons/basestationmarker.png';
                iconClicked = 'res/icons/mapIcons/basestationmarkerclicked.png';
                break;
            default:
                    icon = 'res/icons/mapIcons/unknownmarker.png'
                    iconClicked = 'res/icons/mapIcons/unknownmarkerclicked.png'
                    break;
        }
        // marker = addMarker(elementPos, icon, iconClicked, selectedRows, element.Id, element.Name);
        //marker = new Marker(elementPos, icon, iconClicked, element.Id - 1, element.Name)
        const marker = new Marker(elementPos[0], elementPos[1] , icon, iconClicked, element.Id - 1, element.Name, element.BatteryLevel, element.Strength);
        markers.push(marker)
    })
    //console.log(markers);
    return markers;
}
const updateAllMarkers = (data) => {
    
    // sprawdza czy kazda rekord ma swoj marker

    data.forEach( singleData => {

        let isInData = false;

        markers.forEach( marker => {
            if(singleData.Id - 1 == marker.elementId){
                isInData = true;
            }
        })

        if(!isInData){

            var elementPos = [singleData.Position.Lat, singleData.Position.Lon]
            let icon;
            let iconClicked;
            switch(singleData.Type){
                case "Portable":
                    icon = 'res/icons/mapIcons/portablemarker.png';
                    iconClicked = 'res/icons/mapIcons/portablemarkerclicked.png';
                    break;
                case "Car":
                    icon = 'res/icons/mapIcons/carmarker.png';
                    iconClicked = 'res/icons/mapIcons/carmarkerclicked.png';
                    break;
                case "BaseStation":
                    icon = 'res/icons/mapIcons/basestationmarker.png';
                    iconClicked = 'res/icons/mapIcons/basestationmarkerclicked.png';
                    break;
                default:
                    icon = 'res/icons/mapIcons/unknownmarker.png'
                    iconClicked = 'res/icons/mapIcons/unknownmarkerclicked.png'
                    break;
        }

            const marker = new Marker(elementPos[0], elementPos[1] , icon, iconClicked, singleData.Id - 1, singleData.Name, singleData.BatteryLevel, singleData.Strength);
            markers.push(marker)
        }
    })


    // sprawdza czy nie ma markerów które nie maja swojego odpowiednika w danych

    markers.forEach( marker => {

        let isInMarkers = false;

        data.forEach( singleData => {
            if(singleData.Id - 1 == marker.elementId){
                isInMarkers = true;
            }
        })

        if(!isInMarkers){

            // jesli element do usuniecia byl wybrany jest usuwany z tablicy wybranych
            // urzadzen

            if(selectedDevices.indexOf(marker.elementId) != -1){
                selectedDevices.splice(selectedDevices.indexOf(marker.elementId), 1);
            }

            markers.splice(markers.indexOf(marker), 1);
            marker.destroyMarker();
            marker = null;
        }

    })

    markers.forEach(marker => {
        let id = marker.elementId;

        marker.updateClicked();
        marker.setHealth(data[parseInt(marker.elementId)].BatteryLevel, data[parseInt(marker.elementId)].Strength);
        marker.updatePosition(data[id].Position.Lat, data[id].Position.Lon)

        if(marker.elementName == "" && marker.clicked == true){

            if(polylineToClosest1 != null && polylineToClosest2 != null && distanceMarker1 != null && distanceMarker2 != null){
                map.removeLayer(polylineToClosest1)
                map.removeLayer(polylineToClosest2)
                map.removeLayer(distanceMarker1)
                map.removeLayer(distanceMarker2)
            }

            const distances = markers.map(marker1 => ({
                marker,
                lat: marker1.lat,
                lon: marker1.lon,
                distance: map.distance(marker1.marker.getLatLng(), marker.marker.getLatLng())
            }));

            distances.sort((a, b) => a.distance - b.distance);


            let pointA = L.latLng(marker.lat, marker.lon);
            let pointB = L.latLng(distances[1].lat, distances[1].lon);
            let pointC = L.latLng(distances[2].lat, distances[2].lon);

            let distance1 = map.distance(pointA, pointB).toFixed(2);
            let distance2 = map.distance(pointA, pointC).toFixed(2);

            var midpoint1 = L.latLng(
                (pointA.lat + pointB.lat) / 2,
                (pointA.lng + pointB.lng) / 2
            );

            var midpoint2 = L.latLng(
                (pointA.lat + pointC.lat) / 2,
                (pointA.lng + pointC.lng) / 2
            );

            polylineToClosest1 = L.polyline([pointA, pointB], {color: '#707070'}).addTo(map);
            polylineToClosest2 = L.polyline([pointA, pointC], {color: '#707070'}).addTo(map);

            distanceMarker1 = L.marker(midpoint1, {
                icon: L.divIcon({
                    className: 'distance-label',
                    html: '<button>Distance: ' + distance1 + ' m</button>'
                })
            }).addTo(map);

            distanceMarker2 = L.marker(midpoint2, {
                icon: L.divIcon({
                    className: 'distance-label',
                    html: '<button>Distance: ' + distance2 + ' m</button>'
                })
            }).addTo(map);
    
    

        }else{
            if(polylineToClosest1 != null && polylineToClosest2 != null && distanceMarker1 != null && distanceMarker2 != null){
                map.removeLayer(polylineToClosest1)
                map.removeLayer(polylineToClosest2)
                map.removeLayer(distanceMarker1)
                map.removeLayer(distanceMarker2)
            }
        }



    })

}

const clearMarkers = () => {
    markers.forEach(marker => marker.destroyMarker());
    markers = [];
};