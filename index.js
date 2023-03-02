function updateTime() {
  const date = new Date();
  let hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  document.getElementById("hours").innerHTML = hours;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("minutes").innerHTML = minutes;

  let seconds = date.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("seconds").innerHTML = seconds;

  const days = [
    "Sunday, ",
    "Monday, ",
    "Tuesday, ",
    "Wednesday, ",
    "Thursday, ",
    "Friday, ",
    "Saturday, ",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDay = days[date.getDay()];
  const currentMonth = months[date.getMonth()];
  document.getElementById(
    "current-date"
  ).innerHTML = `${currentDay} ${currentMonth} - ${"0" + date.getDate() + "."}`;
}

setInterval(updateTime, 1000);
updateTime();

const buttonClose = document.getElementById("thank-you");

document.getElementById("thank-you").addEventListener("click", function () {
  alert("Thank you for clicking the button 🤠 You are the best! 😊");
});

// API fetch below

const key = "SNylpuEw23ALoUL99ndMiu4s7aeCt1wm";

// get weather info

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// get city info

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// ispis na app-u

const cityForm = document.getElementById("weather-container");
const tempDisplay = document.getElementById("weather");

const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;

  tempDisplay.innerHTML = `${Math.ceil(
    weather.Temperature.Metric.Value
  )}&deg;C`;
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

const city = "Belgrade"; // City name
updateCity(city)
  .then((data) => updateUI(data))
  .catch((err) => console.log(err));
