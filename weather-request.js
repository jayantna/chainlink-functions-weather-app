// Entrypoint for the Chainlink Function

const city = args[0]
if (!city) {
  city = "London"
}

const apiResponse = await Functions.makeHttpRequest({
  url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${secrets.OPENWEATHER_API_KEY}&units=metric`,
  method: "GET",
})

if (apiResponse.error) {
  console.log("Error in API call")
  throw new Error("Request failed")
}

console.log(apiResponse.data)
// Extract the required weather information
const temperature = Math.round(apiResponse.data.main.temp)
const humidity = apiResponse.data.main.humidity
const sunrise = apiResponse.data.sys.sunrise
const sunset = apiResponse.data.sys.sunset
const weatherStatus = apiResponse.data.weather[0].main

// Format the data as a simple CSV string for the smart contract to parse
return Functions.encodeString(
  JSON.stringify({
    temperature: temperature,
    humidity: humidity,
    sunrise: sunrise,
    sunset: sunset,
    weatherStatus: weatherStatus,
  })
)
// return Functions.encodeUint256(temperature);
