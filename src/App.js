import Bot from "./components/Bot";
import Weather from "./components/Weather";
import { weatherContext } from "./context/WeatherContext";
import { useContext } from "react";



function App() {
  const {background, ui} = useContext(weatherContext)

  return (
    <div className="App" style={{background: `url(${background}) center center/cover no-repeat`}}>
      <div className="text-light d-flex align-items-center pt-4 justify-content-center">

      <div className='container'>
            <div className="weather-container">
              { ui === "weather" ? <Weather /> : <Bot />}
            </div>

        </div>

      </div>
    </div>
  );
}

export default App;
