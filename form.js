export const initForm = () => {
    const form = document.getElementById('weather-form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const city = document.getElementById('city-input').value;
        const date = document.getElementById('date-input').value;

        console.log(city, date);
    })
}