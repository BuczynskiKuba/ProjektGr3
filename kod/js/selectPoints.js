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

    console.log(selectedDevices);
    loop();
}

const rowSelected = () => {
    tableRows.forEach( row => {
        row.addEventListener('click', () => {
            if( row.classList.contains('selected')){
                console.log(true);
                console.log(row.id);
                updateSelectedDevices(row.id, true)
            }else{
                updateSelectedDevices(row.id);
            }
        })
    })
}


// element.addEventListener('click', () => {

//     // tutaj usuwamy zaznaczenie po kliknieciu na zaznaczony
//     if(element.classList.contains("selected")){
        
//         element.classList.remove('selected');
//         // usuwanie id z selectedDevices po odznaczeniu
//         const index = selectedDevices.indexOf(element.id);
//         if (index > -1) {
//             selectedDevices.splice(index, 1);
//         }
//     } else {
//         //
//         if (selectedDevices.length >= 2) {
//             // jeśli mamy juz 2 zaznaczone usuwamy "najstarsze" zaznaczenie
//             const oldestSelected = selectedDevices.shift(); // usuwanie pierwszego elementu
//             // wybiera wiersz z którego zostanie usunieta klasa selected
//             const rowToDeselect = Array.from(tableRows).find(row => row.id === oldestSelected);
//             if (rowToDeselect) {
//                 rowToDeselect.classList.remove('selected');
//             }
//         }
//         // Zaznaczamy nowy wiersz i dodajemy jego ID do selectedDevices
//         element.classList.add('selected');
//         selectedDevices.push(element.id);
//     }
// });