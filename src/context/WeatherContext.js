import { createContext, useState, useEffect } from "react"
import axios from "axios"



export const weatherContext = createContext()

function WeatherContextProvider({ children }) {
    const API_KEY = "9b18fbb7b43df8a4773b11807ffa6e24";

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
        icon: ""
    })

    // Load weather
    useEffect(() => {
        fetchWeather()

    }, [])

    const fetchWeather = async (city="akure") => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            const {data} = await axios.get(url)
            const {main, weather, wind, name} = data
            
            setState({
                ...main,
                description: weather[0].description,
                icon: weather[0].icon,
                wind: wind.speed,
                name
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
        fetchWeather,
        formatDate,

    }}>
        {children}
    </weatherContext.Provider>
}

export default WeatherContextProvider