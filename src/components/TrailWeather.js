import {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'


function TrailWeather({trail}){
    const {location} = trail
    const place = location.split(/\,/)
    console.log(place)
    const apiKey = process.env.REACT_APP_API_KEY
    const [isLoaded, setIsLoaded] = useState(false)
    
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${place}l&appid=${apiKey}&units=imperial`
    const [apiData, setApiData] = useState({})

    useEffect(() => {
        fetch(apiURL)
        .then(r => r.json())
        .then(resp => {
            setApiData(resp)
            setIsLoaded(true)
        })
    }, [apiURL]);

    if(!isLoaded){
        return(
            <p>Loading!</p>
        )
    }

    console.log(apiData)

    let photoStyle = {
        height: "100px",
        width: "auto"
    }

    let cardStyle = {
        width: "15rem",
        height: "17rem"
    }
    
    return (
        <div className="weatherCard">
            <h3>Current Weather</h3>
            <Card style={cardStyle}>
                <Card.Img style={photoStyle} variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}/>
                <Card.Body>
                <Card.Title>Current Temp: {apiData.main.temp}</Card.Title>
                <Card.Subtitle>Feels like: {apiData.main.feels_like}</Card.Subtitle>
                <Card.Text>
                    {apiData.weather[0].description}<br/>
                    <a href={`https://www.google.com/search?q=weather+${place}`} rel="noopener noreferrer" target="_blank">Forecast</a>
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TrailWeather; 