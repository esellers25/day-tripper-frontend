import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import TrailCarousel from './TrailCarousel';
import TrailReviews from './TrailReviews';
import AddPhotoForm from './AddPhotoForm';
import {Button} from './style';
import TrailMap from './TrailMap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import TrailWeather from './TrailWeather';

function TrailMainPage(){
    
    const {id} = useParams()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    
    const [reviews, setReviews] = useState([])
    const [photos, setPhotos] = useState([])
    const [favorited, setFavorited] = useState(false)
    const [error, setError] = useState("")
    
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.userReducer.lists)
    const trailList = useSelector((state) => state.userReducer.trailLists)
    const username = useSelector((state) => state.userReducer.username)
    
    useEffect(() => {
        fetch(`http://localhost:3000/trails/${id}`)
        .then(r => r.json())
        .then(resp => {
            dispatch({type: "setTrailInfo", payload: resp})
            setPhotos(resp.photos)
            setReviews(resp.reviews)
            setIsLoaded(true)
        })
    }, [id])
    
    const trail = useSelector((state) => state.trailReducer.trail)
 
    
    function handleNewReview(newReview){
        let updatedReviews = [...reviews, newReview]
        setReviews(updatedReviews)
        setIsLoaded(true)
    }
    
    function handleReviewDelete(id){
        let updatedReviews = reviews.filter((review) => review.id !== id)
        setReviews(updatedReviews)
        setIsLoaded(true)
    }

    function addFavorite(){
        if(username !== ""){
            fetch("http://localhost:3000/trail_lists", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                    trail_id: id, 
                    list_id: lists[0].id
                })
            })
            .then(r => r.json())
            .then(resp => setFavorited(true))
        }
        else {
            setError("Login to favorite!")
        }
    }

    function elevationPopover(elevation) {
        if(elevation >= 500 && elevation < 700){
            return("This is like climbing the Space Needle in Seattle!")
        }
        else if (elevation >= 300 && elevation < 500){
            return("This is like climbing the Great Pyramid at Giza!")
        }
        else if (elevation >= 700 && elevation < 1000){
            return("This is like climbing the Golden Gate Bridge!")
        }
        else if(elevation >= 1000 && elevation < 1200){
            return("This is like climbing the Eiffel Tower from the bottom to the tip!")
        }
        else if(elevation >= 1200 && elevation < 1500){
            return("This is as tall the Empire State Building!")
        }
        else if(elevation >= 1500 && elevation < 1800){
            return("This is like climbing to the top of the antenna on the Sears Tower")
        }
        else if(elevation >= 1800 && elevation < 2100){
            return("This is 3.5 times as tall as the Washington Monument!")
        }
        else if(elevation >= 2100 && elevation < 2400){
            return("This is nearly 4 times as tall as St. Paul's Cathedral!")
        }
        else if(elevation >= 2400 && elevation < 2600){
            return("This is twice as tall as the Empire State Building!")
        }
        else if(elevation >= 2600 && elevation < 2900){
            return("This as tall as eight football fields stacked end to end!")
        }
        else {
            return null
        }
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Content>
            {elevationPopover(trail.elevation_gain)}
          </Popover.Content>
        </Popover>
      );

    if (isLoaded) {

        const trailIds = trailList.map((trailObj) => trailObj.trail_id)
        const coordinates = {
            latitude: trail.latitude,
            longitude: trail.longitude
        }

    return(
        <div className="trailMain">
            <div className="trailComponents">
                <h2>{trail.name} - {trail.location}</h2>
                {photos.length >= 3 ? <TrailCarousel photos={photos}/> : null}
                <ButtonGroup>
                {trailIds.includes(parseInt(id)) ? null : <Button secondary onClick={() => addFavorite()}>{favorited ? "Added" : "Add to favorites"}</Button>}
                <h4>{error}</h4>
                    <Button secondary onClick={() => history.push(`/trail/${id}/photos`)}>See all photos</Button>
                    <AddPhotoForm />
                </ButtonGroup>
                <div className="trailstats">
                    <h4>Route Type: {trail.route_type}</h4>
                    <h4>Difficulty: {trail.difficulty}</h4>
                    <h4>Distance: {trail.length} miles</h4>
                    <OverlayTrigger overlay={popover} placement="top" trigger='hover'>
                        <h4>Elevation Gain: {trail.elevation_gain} ft</h4>
                    </OverlayTrigger>
                </div>
            </div>
            <TrailMap coordinates={coordinates}/>
            <div id="weatherReviews">
                <TrailReviews reviews={reviews} onNewReview={handleNewReview} onDeleteReview={handleReviewDelete}/>
                <TrailWeather trail={trail}/>
            </div>
        </div>
    )}
    else {
        return (
          <p>Loading</p>
        )
      }
}

export default TrailMainPage; 