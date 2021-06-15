import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import TrailCarousel from './TrailCarousel';
import TrailReviews from './TrailReviews';
import AddPhotoForm from './AddPhotoForm';

function TrailMainPage(){
    
    const {id} = useParams()
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
                "Content-type": "application/json"
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
        // const photoSet = photos.map((photo) => 
        //     <div key={photo.id}>
        //         <img src={photo.img_link} alt={photo.title}/>
        //     </div>
        // )
        // console.log(slidePhotos)

        let trailIds = trailList.map((trailObj) => trailObj.trail_id)

    return(
        <div>
            <div>
                <h2>{trail.name}</h2>
                <h2>{trail.location} ({trail.state})</h2>
                {/* {photoSet} */}
                <TrailCarousel photos={photos}/>
                {trailIds.includes(parseInt(id)) ? null : <button onClick={() => addFavorite()}>{favorited ? "Added" : "Add to favorites"}</button>}
                <AddPhotoForm />
                <h4>Route Type: {trail.route_type}</h4>
                <h4>Difficulty: {trail.difficulty}</h4>
                <h4>Distance: {trail.length} miles</h4>
                <h4>Elevation Gain: {trail.elevation_gain} ft</h4>
            </div>
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