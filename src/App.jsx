import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'



function App() {

  const [coor, setCoor] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)



  useEffect(() => {


    setTimeout(() => {

      setShowMessage(true)

    }, 5000)


    const success = pos => {

      setCoor({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }

    function error(err) {
      setHasError(true)
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(success, error)

  }, [])

  console.log(coor)



  useEffect(() => {

    if (coor) {
      const API_kEY = "d3e05e2fd3610bf9239403478ca37b6b"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coor.lat}&lon=${coor.lon}&appid=${API_kEY}`
      axios.get(url)
        .then(promiseResponse => {
          setWeather(promiseResponse.data)
          const celsius = (promiseResponse.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1)
          setTemp({ celsius, fahrenheit })

        })
        .catch(e => console.log(e))
        .finally(() => setIsLoading(false))
    }
  }, [coor])

  console.log(weather)



  return (
    <div className="app">
      {

        isLoading ?
          (<div>
            <h1 >Is Loading ...</h1>

            {
              showMessage && <p>Please, give acces to your location</p>
            }

            
          </div>)
          : (
            hasError ? <h1 style={{ color: 'white' }}>If you want to get your local weather, please allow acces to your location</h1> : (
              <WeatherCard weather={weather} temp={temp} />
            ))
      }
    </div>




  )
}

export default App
