import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'

function TrailMainPage(){
    let today = new Date().toISOString().substr(0, 10);
    
    const {id} = useParams()
    const history = useHistory()
    // const [trail, setTrail] = useState(null)
    const [show, setShow] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [photoDisplay, setPhotoDisplay] = useState(false)
    const [reviews, setReviews] = useState([])
    const [photos, setPhotos] = useState([])
    const [comment, setComment] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [rating, setRating] = useState("")
    const [date, setDate] = useState(today)
    const [favorited, setFavorited] = useState(false)
    const [title, setTitle] = useState("")
    const [img, setImg] = useState(null)
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.userReducer.id)
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
    // const reviews = useSelector((state) => state.trailReducer.reviews)
    // const photos = useSelector((state) => state.trailReducer.photos)
   
  
   
    function handleFormShow(){
       setShow(!show)
    }

    function handlePhotoChange(e){
        setImg(e.target.files[0])
    }
   

   function onReviewSubmit(e){
       e.preventDefault()
       fetch(`http://localhost:3000/reviews`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
               "Authorization": localStorage.token
           },
           body: JSON.stringify({
               comment: comment,
               rating: rating,
               difficulty: difficulty,
               date: date,
               trail_id: id,
               user_id: userId
           })
       })
       .then(r => r.json())
       .then(newReview => {
        //    dispatch({type: "add_new_review", action: newReview})
            let updatedReviews = [...reviews, newReview]
            setReviews(updatedReviews)
           console.log(newReview)
           setRating("")
           setComment("")
           setDifficulty("")
           setDate(today)
           setIsLoaded(true)
       })
    }

    function onReviewDelete(id){
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.token
            }
        })
        .then(r => r.json())
        .then(resp => {
            console.log(resp)
            let updatedReviews = reviews.filter((review) => review.id !== id)
            // dispatch({type:"delete_review", action: updatedReviews})
            setReviews(updatedReviews)
            setIsLoaded(true)
        })
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

    function handlePhotoDisplay(){
        setPhotoDisplay(!photoDisplay)
    }

    function addPhoto(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('img_link', img)
        formData.append('title', title)
        formData.append('date', today)
        formData.append('user_id', userId)
        formData.append('trail_id', id)
        fetch("http://localhost:3000/photos", {
            method: "POST",
            body: formData
        })
        .then(r => r.json())
        .then(resp => console.log(resp))
    }
   

    if (isLoaded) {

        const reviewList = reviews.map((review) =>
        <div key={review.id}>
            <p onClick={() => history.push(`/user/${review.user_id}`)}>{review.review_author}</p>
            <p>{review.date}</p>
            <p>{review.difficulty}</p>
            <p>{review.comment}</p>
            <p>{review.rating}</p>
            {userId === review.user_id ? <button onClick={() => onReviewDelete(review.id)}>delete</button> : null}
        </div>
        )
       
        const photoSet = photos.map((photo) => 
            <div key={photo.id}>
                <img src={photo.img_link} alt={photo.title}/>
            </div>
        )

        let trailIds = trailList.map((trailObj) => trailObj.trail_id)

    return(
        <div>
            <div>
                <h1>{trail.name}</h1>
                <h2>{trail.location} ({trail.state})</h2>
                {photoSet}
                {trailIds.includes(parseInt(id)) ? null : <button onClick={() => addFavorite()}>{favorited ? "Added" : "Add to favorites"}</button>}
                <button onClick={() => handlePhotoDisplay()}>Upload a photo</button>
                {photoDisplay ? 
                <div>
                    <form onSubmit={addPhoto}>
                        <label htmlFor="title">Title</label>
                        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <label htmlFor="image">File</label>
                        <input type="file" accept='image/*' name="image" multiple={false} onChange={handlePhotoChange}></input>
                        <button>Add photo</button>
                    </form>
                </div> : 
                null}
                <h4>Route Type: {trail.route_type}</h4>
                <h4>Difficulty: {trail.difficulty}</h4>
                <h4>Distance: {trail.length} miles</h4>
                <h4>Elevation Gain: {trail.elevation_gain} ft</h4>
            </div>
            <div>
            {reviewList}
            </div>
            <div>
                <h3>Add a review</h3>
                {localStorage.token ? <button onClick={handleFormShow}>Review</button> : "Log in to leave a review!"}
                {show ? 
                <div>
                    <form onSubmit={onReviewSubmit}>
                        <label htmlFor="rating">Rating</label>
                        <input value={rating} onChange={(e) => setRating(e.target.value)} name="rating" type="number" min={1} max={5}></input>
                        <label htmlFor="difficulty">Difficulty</label>
                        <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="moderate">Moderate</option>
                            <option value="hard">Hard</option>
                        </select>
                        <label htmlFor="comment">Comment</label>
                        <input value={comment} onChange={(e) => setComment(e.target.value)} name="comment" type="textarea"></input>
                        <label htmlFor="date">Date</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} id="today" name="date" type="date"></input>
                        <button type="submit">Submit my review</button>
                    </form>
                </div> : 
                null}
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