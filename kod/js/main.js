// pobranie elementów z html'a które sie nie zmieniają
const tbody = document.querySelector('.table table tbody'); // ciało tabeli gdzie jest wrzucany kod html z wygenerowana tabela
let sortButtonsASC = document.querySelectorAll('.asc') // przycisk do sortowania
let sortButtonsDESC = document.querySelectorAll('.desc') // przycisk do sortowania

let server = 'http://localhost:8080/radios/' // adres z którego są pobierane dane
let selectedDevices = []; // tablica przechowuje ID wybranych urządeń
let markers = []; // tablica aktualnie wyświetlanych markerów
let sortBy = "Id" // po jakim polu maja byc sortowane dane, domyslnie po ID; 
let sortAsc = true; // sortowanie rosnące, domyślnie rosnące;
let tableRows; // wiersze w tabeli
let data; // dane pobrane z api;
let polyline = '' // linia prota miedzy punktami
let distanceMarker = '' // marker wyswietlajacy odleglosc miedzy punktami
let isLineShowed = false // zmienna pomocnicza informujaca o tym czy linia miedzy elementami jest pokazana;
let healthIndicators = []; // health status of devices array

// unAuthorizedDevice
let polylineToClosest1 = null;
let polylineToClosest2 = null;
let distanceMarker1 = null;
let distanceMarker2 = null;


/**
 * init() - funkcja asynchroniczna, wykonuje sie raz po załadowaniu strony
 *          jest w ustawianie częstotliwości pobierania danych i odświeżania loop()
 *          dodatkowo są w niej ustawiane wartości wymagające ustawienia tylko raz
 */
const init = async () => {
    data = await getData(server);

    // odpalenie wszystkiego na wstepie
    loop();

    // dodanie eventListenerów do przycisków sortowania danych

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

    // Odswiezanie loopa i pobierania danych
    const intervalgetData = setInterval(async () => {
        data = await getData(server)
        loop();
    }, 5000)
}


/**
 * loop() - funckja asynchroniczna gdzie strona odświeża swoją zawartość co określoną ilośc sekund
 */
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

    // tworzenie klona posortowanych danych dla tabeli
    let sortedData = sortByField(data.slice(), sortBy, sortAsc);
    // dodawanie tabeli do html'a 
    tbody.innerHTML = tableGenerator(sortedData, selectedDevices)

    // pobranie elementów z html'
    tableRows = document.querySelectorAll('.tableRow');
    healthIndicators = document.querySelectorAll('.health')

    // aktualizacja markerów
    updateAllMarkers(data)
    // aktualizacja wybranych urządzeń
    rowSelected();
    // obliczenie dystansu miedzy punktami jesli sa 2 wybrane urzadzenia
    calculateDistance();
};

init();
