import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import lodash from 'lodash.debounce';
import itemListTemplate from './templates/cardTemplateMini.hbs';
import specificItemTemplate from './templates/cardTemplateFull.hbs';


const DEBOUNCE_DELAY = 300;
let formData = '';

const countriesList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const inputField = document.querySelector("input#search-box")


inputField.addEventListener('input', lodash(() => {
    if (inputField.value.trim() === '') {  // do this to avoid having error after emptying the field
        countriesList.innerHTML = '';
        countryInfo.innerHTML = '';
    }

    countriesList.innerHTML = ' '; //add this to clean countryCard after updating the field results

    formData = inputField.value.trim();
    const dataTrimmed = formData;

    if (dataTrimmed !== '') {
        loadCountries(formData);
    } else {
         Notiflix.Notify.failure("Oops, there is no country with that name");
    }
   
}, DEBOUNCE_DELAY))

async function loadCountries(formData) {
    try {
        const data = await fetchCountries(formData);
        console.log(data);
        renderCountry(data);
    }
    catch (error){
        console.log(error);
    }
}

function renderCountry(country) {
    countryInfo.innerHTML = '';
    if (country.length > 1 && country.length <= 10) {
        country.map((item) => {
            const obj = {
                name: item.name,
                nativeName: item.nativeName,
                flag: item.flag,
            }
            console.log(itemListTemplate(obj))
            return countriesList.insertAdjacentHTML('afterbegin', itemListTemplate(obj));
        });
    }
    if (country.length === 1) {
        countriesList.innerHTML = '';
    
        country.map(item => {
            const obj = {
                name: item.name.common,
                official: item.name.official,
                capital: item.capital,
                population: item.population,
                flags: item.flags.svg,
                languages: item.languages.map(({name}) => name),
            }
                console.log(item);
            return countryInfo.insertAdjacentHTML('afterbegin', specificItemTemplate(obj));
        })
    }
    if (country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }
    if (country.length === 0){
        Notiflix.Notify.failure("Oops, there is no country with that name");
     }
}
