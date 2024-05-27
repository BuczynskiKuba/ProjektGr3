/**
 * getData() - funckja asynchroniczna pobiera dane z podanego adresu serwera (url)
 * url - adres serwera
 * return - funkcja zwraca pobrane dane jęsli nie wystąpił żaden bład, inaczej wypisuje do konsoli kod błedu i informacje o nim 
 */
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