/*
    updateSelected() - fukncja aktualizuje obecnie zaznaczone urządzenia i wywołuje funkcje które zmieniaja stan wierszy i markerów w zależności od wartości zmiennej selectedDevices()
    na końcu odświeża strone za pomocą loop();
    (id) - id wiersza do zaznaczenia lub odznaczenia
    (remove) - czy usuwamy zaznacznie domyślnie false
*/

const updateSelectedDevices = (id, remove = false) => {

    if(remove){
        for (let i = 0; i < selectedDevices.length; i++){
            if(selectedDevices[i] == id){
                selectedDevices.splice(i, 1);
            }
        }
    }else {
        if(selectedDevices.length >= 2){
            // jeśli mamy juz 2 zaznaczone usuwamy "najstarsze" zaznaczenie
            const oldestSelected = selectedDevices.shift(); // usuwanie pierwszego elementu
        }
        // dodanie urzadzenia do tablicy wybranych
        selectedDevices.push(id);
    }

    loop();
}

/*
   rowSelected() - dodaje eventListenery na każdy wiersz tabeli, po kliknieciu jest wywyłana funckja updateSelected() 
*/
const rowSelected = () => {
    tableRows.forEach( row => {
        row.addEventListener('click', () => {
            if( row.classList.contains('selected')){
                updateSelectedDevices(row.id, true)
            }else{
                updateSelectedDevices(row.id);
            }
        })
    })
}
