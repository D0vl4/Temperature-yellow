function updateTime() {
  const date = new Date();
  let hours = date.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  document.getElementById('hours').innerHTML = hours;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('minutes').innerHTML = minutes;

  let seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  document.getElementById('seconds').innerHTML = seconds;

  const days = [
    'Sunday, ',
    'Monday, ',
    'Tuesday, ',
    'Wednesday, ',
    'Thursday, ',
    'Friday, ',
    'Saturday, ',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentDay = days[date.getDay()];
  const currentMonth = months[date.getMonth()];
  document.getElementById(
    'current-date'
  ).innerHTML = `${currentDay} ${currentMonth} - ${date.getDate() + '.'}`;
}

setInterval(updateTime, 1000);
updateTime();

const buttonClose = document.getElementById('thank-you');

document.getElementById('thank-you').addEventListener('click', function () {
  alert('Thank you for clicking the button 🤠 You are the best! 🌞');
});

async function getWeather() {
  try {
    const apiKey = '2c726f4e3a5c62f9547c7b34e391d15e';
    const city = 'Belgrade';
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=44.81&lon=20.46&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const temperature = Math.round(data.current.temp);
    document.getElementById('weather').innerHTML = `${temperature}°C`;
  } catch (error) {
    console.error(error);
    document.getElementById('weather').innerHTML = 'Wait';
  }
}
getWeather();

// lat = 44.8125
// lon = 20.4612
