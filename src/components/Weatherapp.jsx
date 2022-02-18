import React, { useEffect, useState } from "react";

function Weatherapp() {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("");
  const [searchCity, setSearchCity] = useState("Karachi");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=6254df864d7d9195a1f9b65d0024b009&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(cityName);
    setCityName("");
  };

  let emoji = null;

  if (typeof weatherData.main != "undefined") {
    if (weatherData.weather[0].main == "cloud") {
      emoji = "fa-cloud";
    } else if (weatherData.weather[0].main == "thunderstorm") {
      emoji = "fa-bolt";
    } else if (weatherData.weather[0].main == "drizzle") {
      emoji = "fa-cloud-rain";
    } else if (weatherData.weather[0].main == "rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (weatherData.weather[0].main == "snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } 
  else {
    return <div>...Loading </div>;
  }

  let d = new Date();

  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 ">
            <div className="card text-white text-center">
              <img
                src={`https://source.unsplash.com/600x900/?${weatherData.weather[0].main}`}
                className="card-img"
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      value={cityName}
                      type="text"
                      className="form-control "
                      placeholder="Search Your City"
                      aria-label="Search Your City"
                      aria-describedby="basic-addon2"
                      name="search"
                      onChange={(e) => setCityName(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 className="card-title">
                    {weatherData && weatherData.name};
                  </h2>
                  <p className="card-text lead">
                    {day},{month},{date},{year} <br /> {time};
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">
                    {weatherData && weatherData.main && weatherData.main.temp};
                    &deg;C
                  </h1>
                  <p className="lead fw-bolder mb-0">
                    {weatherData &&
                      weatherData.weather &&
                      weatherData.weather[0] &&
                      weatherData.weather[0].main};
                  </p>
                  <p className="lead">
                    {weatherData &&
                      weatherData.main &&
                      weatherData.main.temp_min};
                    &deg;C |
                    {weatherData &&
                      weatherData.main &&
                      weatherData.main.temp_max};
                    &deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weatherapp;
