const calculateDistance = () => {

    if(selectedDevices.length == 2 && isLineShowed == false){
        
        var pointA = L.latLng(data[parseInt(selectedDevices[0])].Position.Lat, data[parseInt(selectedDevices[0])].Position.Lon);
        var pointB = L.latLng(data[parseInt(selectedDevices[1])].Position.Lat, data[parseInt(selectedDevices[1])].Position.Lon);

        // Linia pomiedzy punktami
        polyline = L.polyline([pointA, pointB], {color: '#707070'}).addTo(map);

        // odgleglosc miedzy punktami
        var distance = map.distance(pointA, pointB).toFixed(2); // w metrach

        // pozycja popupa z wyswitleniem odleglosci
        var midpoint = L.latLng(
            (pointA.lat + pointB.lat) / 2,
            (pointA.lng + pointB.lng) / 2
        );

        distanceMarker = L.marker(midpoint, {
            icon: L.divIcon({
                className: 'distance-label',
                html: '<button>Odległość: ' + distance + ' m</button>'
            })
        }).addTo(map);

        isLineShowed = true

    }else if (selectedDevices.length < 2 || isLineShowed == true){
        // Jeśli istnieje już linia, usuń ją
        if (polyline) {
            map.removeLayer(polyline);
        }
        if (distanceMarker) {
            map.removeLayer(distanceMarker);
        }

        isLineShowed = false
        calculateDistance();
    }
}