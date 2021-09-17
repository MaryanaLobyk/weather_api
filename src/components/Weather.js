import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'

function Weather({
                     city,
                     temp_celsius,
                     temp_feels_like,
                     humidity,
                     wind_speed,
                     temp_max,
                     temp_min,
                     description,
                     weatherIcon
                 }) {

    return (
        <div className='container'>
            <div className='cards pt-4'>
                <h1>{city}</h1>
                <h5 className='py-5'>
                    <i className={`wi ${weatherIcon} display-3`}/>
                    <br/>
                    <br/>
                    <span className='py-3'>{description}</span>
                </h5>
                {temp_celsius ? (<h1>{temp_celsius}&deg;C</h1>) : null}
                <br/>
                <div>
                        <div className='d-flex justify-content-around'>
                            <div>{temp_feels_like ? (<h5>Feels like: {temp_feels_like}&deg;C</h5>) : null}</div>
                            <div>{humidity ? (<h5>Humidity: {humidity}%</h5>) : null}</div>
                            <div>{wind_speed ? (<h5>Wind speed: {wind_speed}</h5>) : null}</div>
                        </div>
                        {/*<p>Humidity: {humidity}%</p>*/}
                        {/*<p>Wind speed: {wind_speed}</p>*/}
                </div>


                {/*{minmaxTemperature(temp_min, temp_max)}*/}
            </div>
        </div>
    );
}

// function minmaxTemperature(temp_min, temp_max){
//     if(temp_min && temp_max){
//         return ( <h5>
//             <span className='px-3'>{temp_min}&deg;</span>
//             <span className='px-3'>{temp_max}&deg;</span>
//         </h5>)
//     }
//
// }

export default Weather;

