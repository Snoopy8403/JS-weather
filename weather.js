
export const loadWeatherData = async (city, date) => {
    try {
        const coordinates = await getCoordinates(city);
        return await getWeatherData(coordinates, date);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCoordinates = (city) => {
    const geocoding = {
        'berln': {lat: 52.5235, lon: 13.4115},
        'budapest': {lat: 47.4984, lon: 19.0408},
        'london': {lat: 51.5002, lon: -0.1262} 
    }

    return new Promise((resolve, reject) => {
        const result = geocoding[city.toLowerCase()]

        result ? resolve(result) : reject(new Error(`Couldn't geocode ${city}`));
    })
}

const getWeatherData =async (coordinates, date) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Budapest`);
    const body = await response.json();

    const dateIndex = body.daily.time.findIndex(d => d === date);

    const result = {
        minTemp: body.daily.temperature_2m_min[dateIndex],
        maxTemp: body.daily.temperature_2m_max[dateIndex]
    }

    return result;
}