import axios from "axios";

const searchInput = document.getElementById("search-input");
const textElement = document.getElementById("country-info");

searchInput.addEventListener("submit", getResult);

function getResult(event) {
    event.preventDefault();
    fetchCountry(event.target[0].value);
    document.getElementById('input-field').value = '';
}

function displayCountry(country) {
    console.log(country);
    textElement.innerHTML = `
        <h2><img id="flag" src="${country.data[0].flag}" alt="country-flag">${country.data[0].name}</h2>
        <p>${country.data[0].name} is situated in ${country.data[0].subregion}. It has a population of ${country.data[0].population} people.<br> The capital is ${country.data[0].capital} and you can pay with ${currencies(country)}.<br>They speak ${country.data[0].demonym}.</p>
`;
}

async function fetchCountry(input) {
    try {
        const response = await axios.get('https://restcountries.com/v2/name/' + input);
        displayCountry(response);
    } catch (e) {
        // Catch errors.
        console.error(e);
        console.log(e.response);

        if (e.response.status === 500) {
            textElement.textContent = "Er ging iets mis bij de server.";
        } else if (e.response.status === 404) {
            textElement.textContent = "Het verzoek is mislukt.";
        }
    }
}

function currencies(country){
    if(country.data[0].currencies[1])  return `${country.data[0].currencies[0].name}'s and ${country.data[0].currencies[1].name}'s`;
 else
    return `${country.data[0].currencies[0].name}'s`;
}
