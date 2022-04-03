import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';
export async function fetchCountries(name) {
    const options = new URLSearchParams ({
        capital: 'capital',
        population: 'population',
        flags: 'flags',
        languages: 'languages',
    })
    try {
        const response = await axios.get(`https://restcountries.com/v2/name/${name}?${options}`);
        console.log(response)
        return response.data;
    } 
    catch (error) {
        Notify.failure("Oops, there is no country with that name")
    }
    
};

