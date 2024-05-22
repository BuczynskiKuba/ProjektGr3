const server = 'http://localhost:8080/radios/';


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

const loop = async () => {
    let data = await getData(server);
    if(data){
        console.log(data);
    }

    table.innerHTML = tableGenerator(data)


};

// Odswiezanie loopa
const intervalId = setInterval(loop, 1000)



const table = document.querySelector('.table');


const tableGenerator = (data) => {
    let deviceId = 0;
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
            </tr>
    `;

    data.forEach(element => {

        let type = '';

        switch(element.Type){
            case "Portable":
                type = 'images/Portable.png'
                break
            case "Car":
                type = 'images/Car.png'
        }

        html += `
            <tr id='deviceId ` + deviceId + `'>
                <td>` + element.Id + `</td>
                <td>` + element.Name + `</td>
                <td>` + element.Type + `</td>
                <td>` + element.SerialNumber + `</td>
                <td>` + element.Strength + `</td>
                <td>` + element.BatteryLevel + `</td>
                <td>` + element.WorkingMode + `</td>
            </tr>
        `
        deviceId++;
    });




    html += '</table>'

    return html;
}
