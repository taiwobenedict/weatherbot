import React, { useEffect } from 'react'
import { FaTemperatureThreeQuarters } from "react-icons/fa6"
import { MdOutlineWindPower } from "react-icons/md"
import { BsFillDropletFill, BsSearch } from 'react-icons/bs'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { useContext, useState } from 'react'
import { weatherContext } from '../context/WeatherContext'
import SlowText from './TextAnimation'
import { RiRobot2Line } from "react-icons/ri"



function Weather() {


    const { name,
        feels_like,
        temp,
        temp_max,
        temp_min,
        humidity,
        pressure,
        wind,
        icon,
        description,
        fetchWeather,
        formatDate,
        setUnit,
        unit,
        background,
        loading,
        showBtn,
        ui,
        setUI,
        showButtons

    } = useContext(weatherContext)

    const [searchInput, setSearchInput] = useState("")
    const [botResponse, setBotResponse] = useState("")
  

    useEffect(() => {
        if (ui === "weather"){
            setBotResponse(`Do you want to know more about ${name}?`)
        } else if (ui === "no") {
            setBotResponse("Alright! Just lemme know when you want to know more.")
        }

    }, [background, name, ui])


    const handleSearch = (e) => {
        e.preventDefault()
        fetchWeather(searchInput.toLowerCase())
        showButtons(false)
    
        setSearchInput("")
    }

    const currentDate = new Date()
    return (
        <div>
            <div className="control">
                <form className='search-box' onSubmit={handleSearch} >
                    <input type="text" placeholder='Search for a city...' className="search" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                    <button type="submit" className='mr-3  search-btn' > <BsSearch size={15} /></button>

                </form>



                <div className="degrees d-flex">
                    <div className="mr-3 degree btn btn-dark" onClick={() => setUnit("metric")}>
                        <sup>o</sup>
                        <sub>C</sub>
                    </div>
                    <div className="mr-3 degree btn btn-dark" onClick={() => setUnit("imperial")}>
                        <sup>o</sup>
                        <sub>F</sub>
                    </div>
                </div>
            </div>

            {/* Bot Assistance */}
            {!loading &&
                <div>
                    <div className="bot">
                        <RiRobot2Line className='bot-icon' />
                        <SlowText text={botResponse} speed={30} />
                    </div>
                    <div className={`bot-btn ${showBtn && "show-btn"}`}>
                        <div className="d-flex justify-content-center align-items-center">
                            <button className="btn btn-sm btn-success mr-3" onClick={()=> setUI("chatbot")}>Sure</button>
                        </div>
                    </div>
                </div>
            }

            <div className="weather-content text-center">
                <h1 className="heading">{name}</h1>
                <p className="date">{formatDate(currentDate)}</p>

                <p className="climax dark-bg">{description}</p>

                <div className="weather-image">
                    <img src={` https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" className="w-100" />
                </div>

                <div className="mx-auto">
                    <div className='temperature'>
                        <span>{temp}</span>
                        <sup>o</sup>
                        {unit === "metric" ? "C" : "F"}
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <p className='m-0 mr-4'> Min: {temp_min}<sup>o</sup>  {unit === "metric" ? "C" : "F"}</p>
                        <p className='m-0'> Max: {temp_max}<sup>o</sup>  {unit === "metric" ? "C" : "F"}</p>
                    </div>
                </div>

            </div>

            <div className="feeds">
                <div className="row mb-3">
                    <div className="col-sm-6 mb-3">
                        <div className="feed dark-bg">
                            <div className="d-flex align-items-center">
                                <div className="icon">
                                    <FaTemperatureThreeQuarters />
                                </div>
                                <div>
                                    <h6 className='m-0'>Real Feel</h6>
                                    <small>{feels_like} <sup>o</sup>  {unit === "metric" ? "C" : "F"}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="feed dark-bg">
                            <div className="d-flex align-items-center">
                                <div className="icon">
                                    <BsFillDropletFill />
                                </div>
                                <div>
                                    <h6 className='m-0'>Humidity</h6>
                                    <small>{humidity}%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-6 mb-3 ">
                        <div className="feed dark-bg">
                            <div className="d-flex align-items-center">
                                <div className="icon">
                                    <MdOutlineWindPower />
                                </div>
                                <div>
                                    <h6 className='m-0'>Wind</h6>
                                    <small>{wind} mph</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 mb-3">
                        <div className="feed dark-bg">
                            <div className="d-flex align-items-center">
                                <div className="icon">
                                    <IoSpeedometerOutline />
                                </div>
                                <div>
                                    <h6 className='m-0'>Pressure</h6>
                                    <small>{pressure} hpo</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Weather

