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
let selectedRowID = 0;
let sortBy = "Id" // po jakim polu maja byc sortowane dane; 
let sortAsc = true;
let tableRows;
let data;

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


    let sortedData = sortByField(data.slice(), sortBy, sortAsc);
    // dodawanie tabeli do html'a 
    tbody.innerHTML = tableGenerator(sortedData, selectedDevices)
    // dodawanie markerów na mapę

    // pobranie elementów z html'
    tableRows = document.querySelectorAll('.tableRow');

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
};

init();
