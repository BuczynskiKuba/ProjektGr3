// url
const server = 'http://localhost:8080/radios/';

// pobranie z html diva o klasie .table gdzie wrzuca sie tabela
const tbody = document.querySelector('.table table tbody');

// aktualnie zaznaczone row'y
// gdyz tabela co 10s sie odswieza dlatego trzeba zapisac co bylo
// klikniete
let selectedRows = [-1, -1];
let markers = []; //tej tablicy użyjemy do czyszczenia danych
let distances = []
let selectedRowID = 0;
let sortBy = "none" // po jakim polu maja byc sortowane dane; 
let sortAsc = true;

let data = []; // 

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

const init = async () => {
    data = await getData(server);
    console.log(data);
    markersGenerator(data)
}


// taki Main, tutaj sie wykonuja rzeczy w petli co 10s
const loop = async () => {
    // pobranie danych 
    data = await getData(server);

    data = sortByField(data, sortBy, sortAsc);

    // dodawanie tabeli do html'a 
    tbody.innerHTML = tableGenerator(data, selectedRows)
    // dodawanie markerów na mapę

    // pobranie elementów z html'a
    let sortButtonsASC = document.querySelectorAll('.asc')
    let sortButtonsDESC = document.querySelectorAll('.desc')

    sortButtonsASC.forEach(element =>{
        element.addEventListener('click', () => {
            sortBy = element.id    
            sortAsc = true;
            loop()
        })
    })

    sortButtonsDESC.forEach(element =>{
        element.addEventListener('click', () => {
            sortBy = element.id
            sortAsc = false;
            loop()
        })
    })

    updateAllMarkers(data)
    selectTableRows(); // odswiezanie zaznaczania dla nowych rekodów w tabeli;
};

// Odswiezanie loopa
const intervalId = setInterval(loop, 5000)

const clearMarkers = (data) => {
    markers.forEach(marker => marker.destroyMarker());
    markers = [];
};
//generator markerów
const markersGenerator = (data) => {

    
    clearMarkers();
    data.forEach(element => {
        var elementPos = [element.Position.Lat, element.Position.Lon]
        let icon;
        let iconClicked;
        switch(element.Type){
            case "Portable":
                icon = '../res/icons/mapIcons/portablemarker.png';
                iconClicked = '../res/icons/mapIcons/portablemarkerclicked.png';
                break;
            case "Car":
                icon = '../res/icons/mapIcons/carmarker.png';
                iconClicked = '../res/icons/mapIcons/carmarkerclicked.png';
                break;
            case "BaseStation":
                icon = '../res/icons/mapIcons/basestationmarker.png';
                iconClicked = '../res/icons/mapIcons/basestationmarkerclicked.png';
                break;
            default:
                icon = unknownIcon;
                iconClicked = unknownIconClicked;
                break;
        }
        // marker = addMarker(elementPos, icon, iconClicked, selectedRows, element.Id, element.Name);
        //marker = new Marker(elementPos, icon, iconClicked, element.Id - 1, element.Name)
        const marker = new Marker(51.505, -0.09, icon, iconClicked, element.Id - 1, element.Name);
        markers.push(marker)
    })
    //console.log(markers);
    return markers;
}
const updateAllMarkers = (data) => {
    markers.forEach(marker => {
        let id = marker.elementId;
        marker.updatePosition(data[id].Position.Lat, data[id].Position.Lon)

        // todo
        // zrobienie jednej funkcji w której bedzie sie zmieniac stan selected
        // i ta funkcja potem bedzie aktualizowac tabele i mape na raz
        // a nie osobno wszystko dziala!

    })

}
const tableGenerator = (data, selectedRows) => {
    // id wierszy tabeli
    let deviceId = 0;

    // html tabeli
    let html = ``;


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
            <tr id=' ${deviceId} ' class='tableRow ${selected}'>
                <td>${element.Id}</td>
                <td>${element.Name}</td>
                <td><img src='${type}'/></td>
                <td>${element.SerialNumber}</td>
                <td><img src='${strength}'/></td>
                <td><img src='${batteryLevel}'/></td>
                <td><img src='${workingMode}'/></td>
            </tr>
        `
        // inkrementacja id wiersza 
        deviceId++;
    });

    return html;
}

const calculateDistance = async (idArr) => {

    idArr.forEach( id => {
        if(id == -1){
            console.log("Select Two Devices");
            return "Select Two Devices"
        }
    })

    console.log("git");

    let data = await getData(server);
    let xA,xB,yA,yB






    return 0
}

const selectTableRows = () => {

    let tableRows = document.querySelectorAll('.tableRow');

    tableRows.forEach(element => {
        element.addEventListener('click', () => {

            // tutaj usuwamy zaznaczenie po kliknieciu na zaznaczony
            if(element.classList.contains("selected")){
                
                element.classList.remove('selected');
                // usuwanie id z selectedRows po odznaczeniu
                const index = selectedRows.indexOf(element.id);
                if (index > -1) {
                    selectedRows.splice(index, 1);
                }
            } else {
                //
                if (selectedRows.length >= 2) {
                    // jeśli mamy juz 2 zaznaczone usuwamy "najstarsze" zaznaczenie
                    const oldestSelected = selectedRows.shift(); // usuwanie pierwszego elementu
                    // wybiera wiersz z którego zostanie usunieta klasa selected
                    const rowToDeselect = Array.from(tableRows).find(row => row.id === oldestSelected);
                    if (rowToDeselect) {
                        rowToDeselect.classList.remove('selected');
                    }
                }
                // Zaznaczamy nowy wiersz i dodajemy jego ID do selectedRows
                element.classList.add('selected');
                selectedRows.push(element.id);
            }
            updateAllMarkers(data)
        });
    });
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


init()
loop()