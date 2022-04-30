import axios from "axios";

console.log('Hallo daar!');

// 1. Get request: https://restcountries.com/v2/all
// 2. Schijf asynchrone functie
// 3. Maak een get request met axios (await)
// 4. Try/ catch block om de errors te vangen.
// 5. Element in html maken, ref opslaan vanuit de JS
// 6. Data injecteren. Map-methode

const countryList = document.getElementById('countries')
const errorMessage = document.getElementById('error');

async function fetchCountries() {
    try {
        // Make request.
        const response = await axios.get('https://restcountries.com/v2/all');
        // Sort by population.
        response.data.sort((a, b) => {
            return a.population - b.population;
        });
        // Build List of countries.
        countryList.innerHTML = response.data.map(c => getCountry(c)).join('');
        console.log(response.data);
    } catch (e) {
        // Catch errors.
        console.error(e);
        console.log(e.response);

        if (e.response.status === 500) {
            errorMessage.textContent = "Er ging iets mis bij de server.";
        } else if (e.response.status === 404) {
            errorMessage.textContent = "Het verzoek is mislukt.";
        }
    }
}



fetchCountries();

function getCountry(country) {
    return `
        <li style="color: ${regionColor(country.region)}">
        <img id="flag" src=${country.flag} alt="country-flag"><br>
            ${country.name}<br>
            Has a population of ${country.population} people.</li>
`;
}

function regionColor(regionName){
    switch (regionName) {
        case 'Europe':
            return "yellow";
        case 'Asia':
            return "red";
        case 'Africa':
            return "blue";
        case 'Americas':
            return "green";
        case 'Oceania':
            return "purple";
        default:
            return "black";
    }
}