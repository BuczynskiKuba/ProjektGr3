// pobranie z html diva o klasie .table gdzie wrzuca sie tabela
const tbody = document.querySelector('.table table tbody');
let sortButtonsASC = document.querySelectorAll('.asc')
let sortButtonsDESC = document.querySelectorAll('.desc')

// aktualnie zaznaczone row'y
// gdyz tabela co 10s sie odswieza dlatego trzeba zapisac co bylo
// klikniete
let server = 'http://localhost:8080/radios/'
let selectedDevices = [];
let markers = []; //tej tablicy użyjemy do czyszczenia danych
let distances = []
let sortBy = "Id" // po jakim polu maja byc sortowane dane; 
let sortAsc = true; // sortowanie rosnące
let tableRows; // wiersze w tabeli
let data; // dane pobrane z api;
let polyline = '' // linia prota miedzy punktami
let distanceMarker = '' // marker wyswietlajacy odleglosc miedzy punktami
let isLineShowed = false // 
let healthIndicators = []; // health status of devices array

// unAuthorizedDevice
let polylineToClosest1 = null;
let polylineToClosest2 = null;
let distanceMarker1 = null;
let distanceMarker2 = null;


// wykonuje sie tylko raz
const init = async () => {
    data = await getData(server);

    // odpalenie wszystkiego na wstepie
    loop();

    // Odswiezanie loopa
    const intervalgetData = setInterval(async () => {
        data = await getData(server)
        loop();
    }, 5000)
    markersGenerator(data)
}


// taki Main, tutaj sie wykonuja rzeczy w petli co 10s
const loop = async () => {

    let unauthorizedDevice = document.querySelector('#add-unauthorized')

    if(unauthorizedDevice.checked){
        data[8] = {
            Id: 9,
            Name: "",
            Type: 'Other',
            SerialNumber: '0000-0000-0000-00000',
            Strength: 11,
            BatteryLevel: 110,
            WorkingMode: 'Data',
            Position: {
                Lat: '50.07996341511315',
                Lon: '19.99437782671384' 
            }
        } 
    }

    let sortedData = sortByField(data.slice(), sortBy, sortAsc);
    // dodawanie tabeli do html'a 
    tbody.innerHTML = tableGenerator(sortedData, selectedDevices)
    // dodawanie markerów na mapę

    // pobranie elementów z html'
    tableRows = document.querySelectorAll('.tableRow');

    healthIndicators = document.querySelectorAll('.health')

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
    rowSelected();
    calculateDistance();
};

init();
