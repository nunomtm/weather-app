import React, { useState } from 'react';
import './App.css';

const api = {
  key: '84b8d82b44730ccbf18518b8d32d2963',
  baseUrl: 'http://api.openweathermap.org/data/2.5/',
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} - ${month} ${date}, ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ?
        ((weather.weather[0].main === 'Clear') ? 'app warm'
          : (weather.weather[0].main === 'Clouds') ? 'app cloudy'
            : (weather.weather[0].main === 'Rain') ? 'app rain'
              : (weather.weather[0].main === 'Snow') ? 'app snow'
                : 'app') : 'app'}>

      <main>
        <h1>Weather Buddy</h1>

        <div className="searchBox">
          <input
            type="text"
            className="searchBar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="locationBox">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weatherBox">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
                            </div>
              <div className="feelsLike">
                <h2>Feels Like</h2>
                {Math.round(weather.main.feels_like)}°c
                            </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>

      <footer>
        <p><span class="white">Copyright &copy;</span> Nuno Macedo Web Developer</p>
      </footer>
    </div>
  );
}

export default App;
