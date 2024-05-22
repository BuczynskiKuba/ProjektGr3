// url
const server = 'http://localhost:8080/radios/';

// pobranie z html diva o klasie .table gdzie wrzuca sie tabela
const table = document.querySelector('.table');

// aktualnie zaznaczone row'y
// gdyz tabela co 10s sie odswieza dlatego trzeba zapisac co bylo
// klikniete
let selectedRows = [];
var markers = []; //tej tablicy użyjemy do czyszczenia danych

// pobieranie danych z API
const getData = async (url) => {
    try {
        const response = await fetch(url);
        
        // Sprawdzenie, czy odpowiedź jest OK (status w zakresie 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Odczytanie i parsowanie danych JSON
        const data = await response.json();
        
        // Zwrócenie danych
        return data;
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}


// taki Main, tutaj sie wykonuja rzeczy w petli co 10s
const loop = async () => {
    // pobranie danych 
    let data = await getData(server);

    clearMarkers();
    // dodawanie tabeli do html'a 
    table.innerHTML = tableGenerator(data, selectedRows)
    // dodawanie markerów na mapę
    markersGenerator(data, selectedRows);
    let tableRows = document.querySelectorAll('.tableRow');

    tableRows.forEach(element => {
        element.addEventListener('click', () => {
            console.log(selectedRows);
            
            // po kliknieciu jest dodawana klasa selected do rowa tabeli i do 
            // tablicy selectedRows jest dodawany id row'a
            // a jesli row juz zawiera selected to zostaje usuniety z row'a i arraya
            if(element.classList.contains("selected")){
                element.classList.remove('selected')
                //usuniecie z selectedRows danego id
                selectedRows[0] = -1;

            }else{
                // u
                tableRows.forEach( row => {
                    if(row.classList.contains("selected")){
                        row.classList.remove("selected")
                    }
                })
                element.classList.add('selected')
                selectedRows[0] = element.id;
            
            }
        })
    })
};

loop()

// Odswiezanie loopa
const intervalId = setInterval(loop, 5000)

const clearMarkers = () => {
    markers.forEach(function(marker) {
        map.removeLayer(marker);
    });
}
//generator markerów na mapie
const markersGenerator = (data, selectedRows) => {
    let type = '';
    data.forEach(element => {
        var elementPos = [element.Position.Lat, element.Position.Lon]
        switch(element.Type){
            case "Portable":
                markers.push(addMarker(elementPos, portableIcon));
                break;
            case "Car":
                markers.push(addMarker(elementPos, carIcon));
                break;
            case "BaseStation":
                markers.push(addMarker(elementPos, baseStationIcon));
                break;
            default:
                markers.push(addMarkerGeneric(elementPos));
                break;
        }
    })

    return markers;
}
const tableGenerator = (data, selectedRows) => {
    // id wierszy tabeli
    let deviceId = 0;

    // html tabeli

    let html = `
        <table class="rounded">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Serial Number</th>
                <th>Strenth</th>
                <th>Battery Level</th>
                <th>Working Mode</th>
            </tr>
    `;


    // petla for po pobranym obiekcie z danymi
    data.forEach(element => {

        // jestli ponizszy warunek sie sprawdzi
        // selected przyjmie wartosc "seleted"
        // przez co taka klasa doda sie do wiersza tabeli

        let selected = ''
        
        selectedRows.forEach( row => {
            if(row == deviceId){
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
                type = '../res/icons/type/portable.png'
                break
            case "Car":
                type = '../res/icons/type/car.png';
                break
            case "BaseStation":
                type = "../res/icons/type/basestation.png";
                break
        }
        // addMarker(element.Position, example);
        // addMarkerGeneric(markerPosition)
        
        if( element.Strength > 0 && element.Strength < 3){
            strength = '../res/icons/strength/strenth2.png'
        }else if( element.Strength >= 3 && element.Strength < 5){
            strength = '../res/icons/strength/strenth3.png';
        }else if( element.Strength >= 5 && element.Strength < 7){
            strength = '../res/icons/strength/strenth4.png';
        }else if( element.Strength >= 7){
            strength = '../res/icons/strength/strenth5.png';
        }else{
            strength = '../res/icons/strength/strenth1.png';
        }

        if(element.BatteryLevel > 0 && element.BatteryLevel < 5){
            batteryLevel = '../res/icons/battery/batterylvl1.png'
        }else if(element.BatteryLevel >= 5 && element.BatteryLevel < 10){
            batteryLevel = '../res/icons/battery/batterylvl2.png'
        }else if(element.BatteryLevel >= 10 && element.BatteryLevel < 20){
            batteryLevel = '../res/icons/battery/batterylvl3.png'
        }else if(element.BatteryLevel >= 20 && element.BatteryLevel < 40){
            batteryLevel = '../res/icons/battery/batterylvl4.png'
        }else if(element.BatteryLevel >= 40 && element.BatteryLevel < 60){
            batteryLevel = '../res/icons/battery/batterylvl5.png'
        }else if(element.BatteryLevel >= 60 && element.BatteryLevel < 90){
            batteryLevel = '../res/icons/battery/batterylvl6.png'
        }else if(element.BatteryLevel >= 90){
            batteryLevel = '../res/icons/battery/batterylvl7.png'
        }else{
            batteryLevel = '../res/icons/battery/batterylvl1.png'
        }

        switch(element.WorkingMode){
            case "Voice":
                workingMode = '../res/icons/workingMode/voice.png'
                break
            case "Data":
                workingMode = '../res/icons/workingMode/data.png'
                break
            case "Idle":
                workingMode = '../res/icons/workingMode/idle.png'
                break
            default:
                workingMode = 'images/Unknown.png'
                break
        }


        // dodawanie kolejnych wierszy do tabeli
        html += `
            <tr id='` + deviceId + `' class='tableRow ` + selected +`'>
                <td>` + element.Id + `</td>
                <td>` + element.Name + `</td>
                <td><img src='` + type + `'/></td>
                <td>` + element.SerialNumber + `</td>
                <td><img src='` + strength + `'/></td>
                <td><img src='` + batteryLevel + `'/></td>
                <td><img src='` + workingMode + `'/></td>
            </tr>
        `
        // inkrementacja id wiersza 
        deviceId++;
    });

    html += '</table>'

    return html;
}
