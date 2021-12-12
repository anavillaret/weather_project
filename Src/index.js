let now = new Date();
let currentDateTime = document.querySelector("#currentDateTime");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
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
let month = months[now.getMonth()];

currentDateTime.innerHTML = `${day}, ${date} ${month}    |    ${hours}:${minutes}`;

function showWeather(response) {
  document.querySelector(
    "#currentCity"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#tempNumber").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}Km/h`;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  let apiKey = "229b59940858bbcbcaf93a52526bf8cd";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "229b59940858bbcbcaf93a52526bf8cd";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?Lat=${lat}&lon=${lon}&appid=229b59940858bbcbcaf93a52526bf8cd&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#currentButton");
locationButton.addEventListener("click", getCurrentLocation);
