import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import lodash from 'lodash.debounce';
import itemListTemplate from './templates/cardTemplateMini.hbs';
import specificItemTemplate from './templates/cardTemplateFull.hbs';

const DEBOUNCE_DELAY = 300;


const refs = {
    countryCard: document.querySelector(".country-list"),
    countryCardTwo: document.querySelector(".country-info"),
    input: document.querySelector("input#search-box")
}

refs.input.addEventListener('input', lodash(() => {
    if (refs.input.value.trim() === '') { // do this to avoid having error after emptying the field
        refs.countryCard.innerHTML = '';
        refs.countryCardTwo.innerHTML = '';
        return;
    }

    refs.countryCard.innerHTML = ' '; //add this to clean countryCard after updating the field results
    fetchCountries(refs.input.value.trim())
        .then(renderCountry)
        .catch(onFetchError)

}, DEBOUNCE_DELAY))

function renderCountry(country) {
    refs.countryCardTwo.innerHTML = ' '
    if (country.length > 1 && country.length <= 10) {
        country.forEach(e => {
            const markup = itemListTemplate(e)
            refs.countryCard.insertAdjacentHTML("afterBegin", markup)
            console.log(markup)
        })

    } else if (country.length <= 1) {
        refs.countryCard.innerHTML = ' '
        country.forEach(e => {
            const newObject = {
                flags: e.flags.svg,
                official: e.name.official,
                name: e.name.common,
                capital: e.capital,
                population: e.population,
                languages: Object.values(e.languages)
            }
            const markupTwo = specificItemTemplate(newObject)
            refs.countryCardTwo.innerHTML = markupTwo;
            console.log(markupTwo)
        })
    } else {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }


}
function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}