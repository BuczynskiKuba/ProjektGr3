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
                icon = unknownIcon;
                iconClicked = unknownIconClicked;
                break;
        }
        // marker = addMarker(elementPos, icon, iconClicked, selectedRows, element.Id, element.Name);
        //marker = new Marker(elementPos, icon, iconClicked, element.Id - 1, element.Name)
        const marker = new Marker(elementPos[0], elementPos[1] , icon, iconClicked, element.Id - 1, element.Name);
        markers.push(marker)
    })
    //console.log(markers);
    return markers;
}
const updateAllMarkers = (data) => {
    markers.forEach(marker => {
        let id = marker.elementId;

        marker.updateClicked();
        marker.updatePosition(data[id].Position.Lat, data[id].Position.Lon)

        // todo
        // zrobienie jednej funkcji w której bedzie sie zmieniac stan selected
        // i ta funkcja potem bedzie aktualizowac tabele i mape na raz
        // a nie osobno wszystko dziala!

    })

}

const clearMarkers = (data) => {
    markers.forEach(marker => marker.destroyMarker());
    markers = [];
};