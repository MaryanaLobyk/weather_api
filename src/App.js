import './App.css';
import Weather from "./components/Weather";
import {Component} from "react";
import SearchCity from "./components/SearchCity";

const API_key = '8aa865282da5a63c426673799b8021ee';

class App extends Component {

    constructor() {
        super();

        this.state = {
            city: undefined,
            country: undefined,
            main: undefined,
            temp_celsius: undefined,
            temp_feels_like: undefined,
            humidity: undefined,
            wind_speed: undefined,
            temp_max: undefined,
            temp_min: undefined,
            description: '',
            error: false,
            icon: undefined,
            dt_txt: undefined,
            day: undefined
        }

        this.weatherIcon = {
            Thunderstorm: 'wi-thunderstorm',
            Drizzle: 'wi-sleet',
            Rain: 'wi-storm-showers',
            Snow: 'wi-snow',
            Atmosphere: 'wi-fog',
            Clear: 'wi-day-sunny',
            Clouds: 'wi-day-fog'
        }

    }

    toCelsius(temp) {
        return Math.floor(temp - 273.15)
    }

    getWeatherIcon(icons, id) {

        switch (true) {
            case id >= 200 && id <= 232:
                this.setState({icon: this.weatherIcon.Thunderstorm});
                break;
            case id >= 300 && id <= 321:
                this.setState({icon: this.weatherIcon.Drizzle});
                break;
            case id >= 500 && id <= 531:
                this.setState({icon: this.weatherIcon.Rain});
                break;
            case id >= 600 && id <= 622:
                this.setState({icon: this.weatherIcon.Snow});
                break;
            case id >= 700 && id <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            case id === 800:
                this.setState({icon: this.weatherIcon.Clear});
                break;
            case id >= 801 && id <= 804:
                this.setState({icon: this.weatherIcon.Clouds})
                break;
            default:
                this.setState({icon: this.weatherIcon.Clear});
        }
    }

    render() {
        let {city, country, temp_celsius, temp_feels_like, humidity, wind_speed, temp_max, temp_min, description, icon, error} = this.state
        return (
            <div className="App">
                <SearchCity getWeather ={this.getWeather} error={error}/>
                <Weather city={city} country={country} temp_celsius={temp_celsius} temp_feels_like={temp_feels_like} humidity={humidity} wind_speed={wind_speed} temp_max={temp_max}
                         temp_min={temp_min} description={description} weatherIcon={icon}/>
            </div>
        );
    }


    getWeather = async (e) => {
        e.preventDefault()

        const city = e.target.elements.city.value
        const country = e.target.elements.country.value

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_key}&cnt=5`)
        const response = await api_call.json()
        console.log(response)

        if(city && country){
            for ( let i=0; i< response.list.length; i+=5){
                this.setState({
                    city: `${response.city.name}, ${response.city.country}`,
                    temp_celsius: this.toCelsius(response.list[i].main.temp),
                    temp_feels_like: this.toCelsius(response.list[i].main.feels_like),
                    humidity: response.list[i].main.humidity,
                    wind_speed: response.list[i].wind.speed,
                    temp_max: this.toCelsius(response.list[i].main.temp_max),
                    temp_min: this.toCelsius(response.list[i].main.temp_min),
                    description: response.list[i].weather[0].description,
                    error: false
                })
                this.getWeatherIcon(this.weatherIcon, response.list[i].weather[0].id)
            }
        }else{
            this.setState({error: true})
        }

    }
}

export default App;

