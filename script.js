// Function to fetch weather data
function getWeather(location) {
    const apiKey = 'YOUR_API_KEY'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract relevant weather information
        const city = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
  
        // Display weather information on the page
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
          <h2>Current Weather in ${city}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${weatherDescription}</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
      });
  }
  
  // Get weather data based on user's location
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude},${longitude}`;
    getWeather(location);
  }, error => {
    console.error('Error getting user location:', error);
    // If user denies location access, prompt for a city name
    const location = prompt('Please enter your city name:');
    if (location) {
      getWeather(location);
    }
  });
  