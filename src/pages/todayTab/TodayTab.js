import React, {useEffect, useState} from 'react';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";
import './TodayTab.css';


function TodayTab({coordinates}) {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [forecasts, setForecasts] = useState([])

    useEffect(() => {
        async function fetchTodayTab() {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
                console.log(response.data)
                setForecasts(response.data.list.slice(0, 3));
            } catch (e) {
                console.log(e)
                toggleError(true);
            }
            toggleLoading(false);
        }

        if (coordinates) {
            fetchTodayTab();
        }
        ;
    }, [coordinates]);

    return (
        <div className="tab-wrapper">
			{ loading && <span>Loading..... </span>}
			{ error && <span>Er is iets misgegaan met het ophalen van de data </span>}

            <div className="chart">
                {forecasts.map((forecast) => {
                    return <WeatherDetail
                        key={forecast.dt}
                        temp={forecast.main.temp}
                        type={forecast.weather[0].main}
                        description={forecast.weather[0].description}
                    />
                })
                }
            </div>
			<div className="legend">
				{forecasts.map((forecast) => {
					return <span key={`${forecast.dt}-timestamp`}>{createTimeString(forecast.dt)}</span>
				})}
			</div>
        </div>
    );

}


export default TodayTab;
