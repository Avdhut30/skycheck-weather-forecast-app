document.getElementById("searchButton").addEventListener("click", function () {
  const cityInput = document.getElementById("cityInput").value;
  fetchWeather(cityInput);
  fetchCityImage(cityInput);
});

// Add keypress event listener to the city input
document
  .getElementById("cityInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const cityInput = document.getElementById("cityInput").value;
      fetchWeather(cityInput);
      fetchCityImage(cityInput);
    }
  });

function fetchWeather(city) {
  const apiKey = "10dc8a935f55af4b91e2cdb6a886947f"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => console.error("Error:", error));
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weatherResult.innerHTML = `
      <div class="card mt-3">
          <div class="card-body">
              <h5 class="card-title">${data.name}</h5>
              <img src="${iconUrl}" alt="Weather icon" class="weather-icon">
              <p class="card-text">Temperature: ${data.main.temp}°C</p>
              <p class="card-text">Weather: ${data.weather[0].main}</p>
          </div>
      </div>
  `;
}

// Placeholder for the fetchCityImage function
function fetchCityImage(city) {
  const accessKey = "7DNsS0ESIAc2EGanRZVIGnPT-YnBCvmLNbdTQCTjXFs"; // Replace with your Unsplash access key
  const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.results[0].urls.regular;
      const cityImageDiv = document.getElementById("cityImage");
      cityImageDiv.innerHTML = `<img src="${imageUrl}" class="img-fluid" alt="Image of ${city}">`;
    })
    .catch((error) => console.error("Error:", error));
}
