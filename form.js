import { addCard } from "./cards";
import { loadWeatherData } from "./weather";

export const initForm = () => {
    const form = document.getElementById('weather-form');
    const submitBtn = document.getElementById('submit');
    const errorMessage = document.getElementById('error-message');
    const cardsContainer = document.getElementById('cards-container');

    setMinMaxDate();

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const city = document.getElementById('city-input').value;
        const date = document.getElementById('date-input').value;

        cardsContainer.insertAdjacentHTML('afterbegin', '<div id="loading-indicator" class="lds-dual-ring"></div>');
        submitBtn.disabled = true;
        try {
            const weatherData =  await loadWeatherData(city, date);
            addCard(city, date, weatherData);
            form.reset();
        } catch (error) {
            errorMessage.style.display = 'block';
            setTimeout(() =>  errorMessage.style.display = 'none', 2000);
        } finally {
            submitBtn.disabled = false;
            cardsContainer.removeChild(document.getElementById('loading-indicator'));
        }

    })
}

const setMinMaxDate = () => {
    const datePicker = document.getElementById('date-input');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const day = now.getDate();
    datePicker.min = `${year}-${padNumber(month)}-${padNumber(day)}`;

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 6);
    const maxDateYear = maxDate.getFullYear();
    const maxDateMonth = maxDate.getMonth()+1;
    const maxDateDay = maxDate.getDate();
    datePicker.max = `${maxDateYear}-${padNumber(maxDateMonth)}-${padNumber(maxDateDay)}`;
}

const padNumber = value => {
    return value < 10 ? value.toString().padStart(2, '0') : value;
}