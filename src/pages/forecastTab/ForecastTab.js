import React, {useState, useEffect} from 'react';
import axios from "axios";
import kelvinToCelsius from "../../helpers/kelvinToCelsius";
import createDateString from "../../helpers/createDataString";
import './ForecastTab.css';

function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchForecasts() {
                toggleLoading(true);
            try {
                toggleError(false)
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
                console.log(response.data)
                const fiveDayForecast = response.data.list.filter((singleForecast) => {
                    return singleForecast.dt_txt.includes("12:00:00");
                })
                setForecasts(fiveDayForecast);
            } catch (e) {
                console.error(e);
                toggleError(true)
            }
            finally {
                toggleLoading(false);
            }
        }


        if (coordinates) {
            fetchForecasts();
        }
    }, [coordinates])


    return (
        <div className="tab-wrapper">
            { loading && <span>Loading..... </span>}
            { error && <span>Er is iets misgegaan met het ophalen van de data </span>}

            {forecasts.length === 0 && !error &&
                <span className="no-forecast"> Zoek eerst een locatie om het weer voor deze week te bekijken</span>
            }

            {forecasts.map((singleForecast) => {
                return <article className="forecast-day" key={singleForecast.dt}>
                    <p className="day-description">
                        {createDateString(singleForecast.dt)}
                    </p>

                    <section className="forecast-weather">
            <span>
              {kelvinToCelsius(singleForecast.main.temp)}
            </span>
                        <span className="weather-description">
              {singleForecast.weather[0].description}
            </span>
                    </section>
                </article>
            })}
        </div>
    );
}

export default ForecastTab;
