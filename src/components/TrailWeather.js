import {useState, useEffect} from 'react'


function TrailWeather({trail}){
    const {latitude, longitude, location} = trail
    const place = location.replace(/\s+/g, '')
    console.log(place)
    // const newLat = latitude.toFixed(2)
    // const newLng = longitude.toFixed(1)
    // console.log(`check the ${newLng}`)
    const apiKey = process.env.REACT_APP_API_KEY
    
    const apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${place}$units=imperial&appid=${apiKey}`
    const [weather, setWeather] = useState({})

    useEffect(() => {
        fetch(apiURL)
        .then(r => r.json())
        .then(resp => console.log(resp))
    }, [apiURL]);
    
    return (
        <div>
            WEATHER
        </div>
    )
}

export default TrailWeather; 