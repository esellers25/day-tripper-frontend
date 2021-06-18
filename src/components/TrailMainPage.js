import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import TrailCarousel from './TrailCarousel';
import TrailReviews from './TrailReviews';
import AddPhotoForm from './AddPhotoForm';
import {Button} from './style';
import TrailMap from './TrailMap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function TrailMainPage(){
    
    const {id} = useParams()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    
    const [reviews, setReviews] = useState([])
    const [photos, setPhotos] = useState([])
    const [favorited, setFavorited] = useState(false)
    
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.userReducer.lists)
    const trailList = useSelector((state) => state.userReducer.trailLists)
    
    useEffect(() => {
        fetch(`http://localhost:3000/trails/${id}`)
        .then(r => r.json())
        .then(resp => {
            dispatch({type: "setTrailInfo", payload: resp})
            setPhotos(resp.photos)
            setReviews(resp.reviews)
            setIsLoaded(true)
        })
    }, [])
    
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



    if (isLoaded) {

        const trailIds = trailList.map((trailObj) => trailObj.trail_id)
        const coordinates = {
            latitude: trail.latitude,
            longitude: trail.longitude
        }

    return(
        <div>
            <div className="trailComponents">
                <h2>{trail.name} - {trail.location} ({trail.state})</h2>
                {trailIds.includes(parseInt(id)) ? null : <Button onClick={() => addFavorite()}>{favorited ? "Added" : "Add to favorites"}</Button>}
                <TrailCarousel photos={photos}/>
                <ButtonGroup>
                    <Button onClick={() => history.push(`/trail/${id}/photos`)}>See all photos</Button>
                    <AddPhotoForm />
                </ButtonGroup>
                <div className="trailstats">
                    <h4>Route Type: {trail.route_type}</h4>
                    <h4>Difficulty: {trail.difficulty}</h4>
                    <h4>Distance: {trail.length} miles</h4>
                    <h4>Elevation Gain: {trail.elevation_gain} ft</h4>
                </div>
            </div>
            <TrailMap coordinates={coordinates}/>
            <TrailReviews reviews={reviews} onNewReview={handleNewReview} onDeleteReview={handleReviewDelete}/>
        </div>
    )}
    else {
        return (
          <p>Loading</p>
        )
      }
}

export default TrailMainPage; 