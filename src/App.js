import React, { Component } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "0bc79d5b0b02862a730b332898fadbba";

class App extends Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        
        const api_call = await fetch(`https://cors.io/?https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`);
        const data = await api_call.json();

        if (city && country) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        }
        else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter the value"
            });
        }
    }

    render() {
        const { temperature, city, country, humidity, description, error } = this.state;
        
        return (
            <React.Fragment>
                <div className="wrapper">
                    <div className="main">
                        <div className="row">
                            <div className="col-xs-5 title-container">
                                <Title />
                            </div>
                            <div className="col-xs-7 form-container">
                                <Form getWeather={this.getWeather} />
                                <Weather 
                                    temperature={temperature}
                                    city={city}
                                    country={country}
                                    humidity={humidity}
                                    description={description}
                                    error={error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;