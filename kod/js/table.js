const tableGenerator = (data, selectedRows) => {
    // html tabeli
    let html = ``;


    // petla for po pobranym obiekcie z danymi
    data.forEach(element => {

        // jestli ponizszy warunek sie sprawdzi
        // selected przyjmie wartosc "seleted"
        // przez co taka klasa doda sie do wiersza tabeli

        let selected = ''
        
        selectedRows.forEach( row => {
            if(row == element.Id - 1){
                selected = "selected";
            } 
        })

        
        // w tych zmiennych jest ustalana sciezka do odpowiedniego obrazka
        let type = '';
        let strength = '';
        let batteryLevel = '';
        let workingMode = '';
        let markerPosition = [element.Position.Lat, element.Position.Lon];
        // ponizsze if'y i switche zmieniaja sciezki do zdjec
        switch(element.Type){
            case "Portable":
                type = 'res/icons/type/portable.png'
                break
            case "Car":
                type = 'res/icons/type/car.png';
                break
            case "BaseStation":
                type = "res/icons/type/basestation.png";
                break
        }
        // addMarker(element.Position, example);
        // addMarkerGeneric(markerPosition)
        
        if( element.Strength > 0 && element.Strength < 3){
            strength = 'res/icons/strength/strenth2.png'
        }else if( element.Strength >= 3 && element.Strength < 5){
            strength = 'res/icons/strength/strenth3.png';
        }else if( element.Strength >= 5 && element.Strength < 7){
            strength = 'res/icons/strength/strenth4.png';
        }else if( element.Strength >= 7){
            strength = 'res/icons/strength/strenth5.png';
        }else{
            strength = 'res/icons/strength/strenth1.png';
        }

        if(element.BatteryLevel > 0 && element.BatteryLevel < 5){
            batteryLevel = 'res/icons/battery/batterylvl1.png'
        }else if(element.BatteryLevel >= 5 && element.BatteryLevel < 10){
            batteryLevel = 'res/icons/battery/batterylvl2.png'
        }else if(element.BatteryLevel >= 10 && element.BatteryLevel < 20){
            batteryLevel = 'res/icons/battery/batterylvl3.png'
        }else if(element.BatteryLevel >= 20 && element.BatteryLevel < 40){
            batteryLevel = 'res/icons/battery/batterylvl4.png'
        }else if(element.BatteryLevel >= 40 && element.BatteryLevel < 60){
            batteryLevel = 'res/icons/battery/batterylvl5.png'
        }else if(element.BatteryLevel >= 60 && element.BatteryLevel < 90){
            batteryLevel = 'res/icons/battery/batterylvl6.png'
        }else if(element.BatteryLevel >= 90){
            batteryLevel = 'res/icons/battery/batterylvl7.png'
        }else{
            batteryLevel = 'res/icons/battery/batterylvl1.png'
        }

        switch(element.WorkingMode){
            case "Voice":
                workingMode = 'res/icons/workingMode/voice.png'
                break
            case "Data":
                workingMode = 'res/icons/workingMode/data.png'
                break
            case "Idle":
                workingMode = 'res/icons/workingMode/idle.png'
                break
            default:
                workingMode = 'images/Unknown.png'
                break
        }


        // dodawanie kolejnych wierszy do tabeli
        html += `
            <tr id=' ${element.Id - 1} ' class='tableRow ${selected}'>
                <td>${element.Id}</td>
                <td>${element.Name}</td>
                <td><img src='${type}'/></td>
                <td>${element.SerialNumber}</td>
                <td><img src='${strength}'/></td>
                <td><img src='${batteryLevel}'/></td>
                <td><img src='${workingMode}'/></td>
            </tr>
        `
    });

    return html;
}
const sortByField = (array, field, ascending = true) => {
    ascending != ascending // nie chce mi sie podmieniac icon żeby sie zgadzało

    return array.sort((a, b) => {
        if (a[field] > b[field]) {
            return ascending ? 1 : -1;
        } else if (a[field] < b[field]) {
            return ascending ? -1 : 1;
        } else {
            return 0;
        }
    });
}