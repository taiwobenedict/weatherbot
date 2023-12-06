import { createContext, useState, useEffect } from "react"
import axios from "axios"

// import Gifs
import clear from "../weatherGifs/clear.gif"
import cloud from "../weatherGifs/cloud.gif"
import fog from "../weatherGifs/fog.gif"
import night from "../weatherGifs/night.gif"
import snow from "../weatherGifs/snow.gif"




export const weatherContext = createContext()

function WeatherContextProvider({ children }) {
    const API_KEY = "9b18fbb7b43df8a4773b11807ffa6e24";
    const [showBtn, showButtons ] = useState(false)
    const [unit, setUnit] = useState("metric")
    const [background, setBackground] = useState("")
    const [ui, setUI ] = useState("weather")


    const [state, setState] = useState({
        name: "",
        feels_like: "",
        temp: "",
        temp_max: "",
        temp_min: "",
        humidity: "",
        pressure: "",
        wind: "",
        description: "",
        icon: "",
        loading: true,
    })

    
    // Load weather
    useEffect(() => {
        fetchWeather()

        // eslint-disable-next-line
    }, [unit])

    const fetchWeather = async (city = "akure") => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
            const { data } = await axios.get(url)
            const { main, weather, wind, name } = data
            const { temp } = main

            if (unit === "metric") {

                if (temp <= 5) {
                    setBackground(snow)
                } else if (temp > 5 && temp <= 10) {
                    setBackground(fog)
                } else if (temp > 10 && temp <= 20) {
                    setBackground(cloud)
                } else if (temp > 20 && temp <= 25) {
                    setBackground(night)
                } else if (temp > 25) {
                    setBackground(clear)
                }

            } else if (unit === "imperial") {

                if (temp <= 21) {
                    setBackground(snow)
                } else if (temp > 32 && temp <= 50) {
                    setBackground(fog)
                } else if (temp > 50 && temp <= 68) {
                    setBackground(cloud)
                } else if (temp > 68 && temp <= 77) {
                    setBackground(night)
                } else if (temp > 77 && temp >= 95) {
                    setBackground(clear)
                }


            }



            setState({
                ...main,
                description: weather[0].description,
                icon: weather[0].icon,
                wind: wind.speed,
                name,
                loading: false,
            })


        } catch (error) {
            console.log(error)

        }
    }

    function formatDate(date) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const day = daysOfWeek[date.getDay()];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? "pm" : "am";

        if (hour > 12) {
            hour -= 12;
        }

        return `${day}, ${month} ${date.getDate()}, ${year} at ${hour}:${minute.toString().padStart(2, '0')}${ampm}`;
    }

  


    return <weatherContext.Provider value={{
        ...state,
        unit,
        background,
        showBtn, 
        ui,
        showButtons,
        fetchWeather,
        formatDate,
        setUnit,
        setUI
        
     
    }}>
        {children}
    </weatherContext.Provider>
}

export default WeatherContextProvider