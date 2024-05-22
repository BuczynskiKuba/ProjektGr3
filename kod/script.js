// import addMarkers from "../../kod/map.js";

// url
const server = 'http://localhost:8080/radios/';

// pobranie z html diva o klasie .table gdzie wrzuca sie tabela
const table = document.querySelector('.table');

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

    // dodawanie tabeli do html'a
    table.innerHTML = tableGenerator(data)


};

// pierwsze wywolanie aby nie czekac 10s
loop();

// Odswiezanie loopa
const intervalId = setInterval(loop, 10000)

const tableGenerator = (data) => {
    // id wierszy tabeli
    let deviceId = 0;

    // html tabeli

    let html = `
        <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Serial Number</th>
                <th>Strenth</th>
                <th>Battery Level</th>
                <th>Working Mode</th>
                <th>Position Lat</th>
                <th>Position Lon</th>
            </tr>
    `;


    // petla for po pobranym obiekcie z danymi
    data.forEach(element => {
        
        // w tych zmiennych jest ustalana sciezka do odpowiedniego obrazka
        let type = '';
        let strength = '';
        let batteryLevel = ''
        let workingMode = '';


        // ponizsze if'y i switche zmieniaja sciezki do zdjec
        switch(element.Type){
            case "Portable":
                type = 'images/Portable.png'
                break
            case "Car":
                type = 'images/Car.png'
                break
            case "BaseStation":
                type = "images/BaseStation.png";
                break
            default:
                type = "images/Unknown.png"
                break
        }
        
        if( element.Strength > 0 && element.Strength < 3){
            strength = 'images/Strength1.png'
        }else if( element.Strength >= 3 && element.Strength < 5){
            strength = 'images/Strength2.png';
        }else if( element.Strength >= 5 && element.Strength < 7){
            strength = 'images/Strength3.png';
        }else if( element.Strength >= 7){
            strength = 'images/Strength4.png';
        }else{
            strength = 'images/Strength0.png';
        }

        if(element.BatteryLevel > 0 && element.BatteryLevel < 25){
            batteryLevel = 'images/Battery1.png'
        }else if(element.BatteryLevel >= 25 && element.BatteryLevel < 50){
            batteryLevel = 'images/Battery2.png'
        }else if(element.BatteryLevel >= 50 && element.BatteryLevel < 75){
            batteryLevel = 'images/Battery3.png'
        }else if(element.BatteryLevel >= 75){
            batteryLevel = 'images/Battery4.png'
        }else{
            batteryLevel = 'images/Battery0.png'
        }

        switch(element.WorkingMode){
            case "Voice":
                WorkingMode = 'images/Voice.png'
                break
            case "Data":
                WorkingMode = 'images/Data.png'
                break
            case "Idle":
                WorkingMode = 'images/Idle.png'
            default:
                WorkingMode = 'images/Unknown.png'
        }


        // dodawanie kolejnych wierszy do tabeli
        html += `
            <tr id='deviceId ` + deviceId + `'>
                <td>` + element.Id + `</td>
                <td>` + element.Name + `</td>
                <td><img scr='` + type + `'/></td>
                <td>` + element.SerialNumber + `</td>
                <td><img scr='` + strength + `'/></td>
                <td><img scr='` + batteryLevel + `'/></td>
                <td><img scr='` + workingMode + `'/></td>
                <td>` + element.Position.Lat + `</td>
                <td>` + element.Position.Lon + `</td>
            </tr>
        `
        //dodanie znacznika na mapie
        // addMarkers(element.Position);

        // inkrementacja id wiersza 
        deviceId++;
    });

    html += '</table>'

    return html;
}


