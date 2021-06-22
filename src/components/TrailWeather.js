// import {useState} from 'react'
// import Card from 'react-bootstrap/Card'
import ReactWeather, { useOpenWeather } from 'react-open-weather';


function TrailWeather({trail}){
    const {latitude, longitude, location} = trail
    // const place = location.split(/\,/)
   
    // const apiKey = process.env.REACT_APP_API_KEY
    // const [isLoaded, setIsLoaded] = useState(false)

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: process.env.REACT_APP_API_KEY,
        lat: latitude,
        lon: longitude,
        lang: 'en',
        unit: 'imperial', 
    });
    
    // const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${place}l&appid=${apiKey}&units=imperial`
    // const [apiData, setApiData] = useState({})

    // useEffect(() => {
    //     fetch(apiURL)
    //     .then(r => r.json())
    //     .then(resp => {
    //         setApiData(resp)
    //         setIsLoaded(true)
    //     })
    // }, [apiURL]);

    // if(!isLoaded){
    //     return(
    //         <p>Loading!</p>
    //     )
    // }

    // let photoStyle = {
    //     height: "100px",
    //     width: "auto"
    // }

    // let cardStyle = {
    //     width: "15rem",
    //     height: "17rem"
    // }
    
    return (
        <div className="weatherCard">
            <h3>Weather</h3>
            {/* <Card style={cardStyle}>
                <Card.Img style={photoStyle} variant="top" src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}/>
                <Card.Body>
                <Card.Title>Current Temp: {apiData.main.temp}</Card.Title>
                <Card.Subtitle>Feels like: {apiData.main.feels_like}</Card.Subtitle>
                <Card.Text>
                    {apiData.weather[0].description}<br/>
                    <a href={`https://www.google.com/search?q=weather+${place}`} rel="noopener noreferrer" target="_blank">Forecast</a>
                </Card.Text>
                </Card.Body>
            </Card> */}
            <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel={location}
            unitsLabels={{ temperature: 'F', windSpeed: 'm/h' }}
            showForecast
            />
        </div>
    )
}

export default TrailWeather; 