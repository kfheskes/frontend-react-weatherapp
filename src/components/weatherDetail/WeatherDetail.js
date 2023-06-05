import React, {useContext} from 'react';
import {TempContext} from "../../context/TempProvider";
import './WeatherDetail.css';
import iconMapper from "../../helpers/iconMappers";

function WeatherDetail({type, temp, description}) {

    const { kelvinToMetric } = useContext(TempContext)

  return (
    <section className="day-part">
      <span className="icon-wrapper">
        {iconMapper(type)}
      </span>
      <p className="description">{description}</p>
      <p>{kelvinToMetric(temp)}</p>
    </section>
  );
}

export default WeatherDetail;
