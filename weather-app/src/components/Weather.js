import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import { CiSearch } from "react-icons/ci";
import sunImg from '../assets/icons8-sun-150.png'
import cloudImg from '../assets/icons8-cloud-48.png'
import drizzleImg from '../assets/icons8-drizzle-90.png'
import rainImg from '../assets/icons8-rain-96.png'
import snowImg from '../assets/icons8-snow-100.png'
import { WiHumidity } from 'react-icons/wi';
import { BiWind } from 'react-icons/bi';

const Weather = () => {
  
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)

  const allIcons= {
    "01d": sunImg,
    "01n": sunImg,
    "02d": cloudImg,
    "02n": cloudImg,
    "03d": cloudImg,
    "03n": cloudImg,
    "04d": drizzleImg,
    "04n": drizzleImg,
    "09d": rainImg,
    "09n": rainImg,
    "10d": rainImg,
    "10n": rainImg,
    "13d": snowImg,
    "13n": snowImg,
  }
  const search = async (city)=>{
    if(city=== ''){
      alert('Please enter a city name')
      return;
    }
try{
  const apiKey = '0cd12978e75d2f05dfeb9892a7c7af98'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&`

const response = await fetch(url)
const data = await response.json()


if(!response.ok){
  alert(data.message)
  return;
}
console.log(data)
const icon = allIcons[data.weather[0].icon] || sunImg
setWeatherData({
  humidity:data.main.humidity,
  windSpeed: data.wind.speed,
  temperature: Math.floor(data.main.temp),
  location: data.name,
  icon: icon
})
}catch (error){
setWeatherData(false)
console.error("ERROR")
}
  }

  useEffect(()=>{
    search('cairo')
  },[])
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <CiSearch className='search-icon' onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData? <>
        <img src={weatherData.icon} alt="sunny" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}^C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
        <WiHumidity className='humidity-icon'/>
          <div>
          <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
        <BiWind  className='wind-icon'/>
          <div>
          <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </> : <></>}
  
    </div>
  )
}

export default Weather
