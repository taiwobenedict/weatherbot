import { useState, useEffect, useContext } from "react";
import { weatherContext } from "../context/WeatherContext";

function SlowText({text, speed}) {
    const { showButtons, name } = useContext(weatherContext)
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) {
            showButtons(true)
          clearInterval(interval);
        }
      }, speed); // Adjust the speed (in milliseconds) to control the animation
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [text, speed, showButtons, name]);

    return <span>{displayedText}</span>
}

export default SlowText
