import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

function TrailMainPage(){
    let today = new Date().toISOString().substr(0, 10);
    
    const {id} = useParams()
    const [trail, setTrail] = useState(null)
    const [show, setShow] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [reviews, setReviews] = useState([])
    const [comment, setComment] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [rating, setRating] = useState("")
    const [date, setDate] = useState(today)
    const userId = useSelector((state) => state.userReducer.id)


    useEffect(() => {
        fetch(`http://localhost:3000/trails/${id}`)
        .then(r => r.json())
        .then(trailInfo => {
            setTrail(trailInfo) 
            setReviews(trailInfo.reviews)
            setIsLoaded(true)
        })
    }, [id])

    if (!isLoaded) {
        return (
            <p>Loading</p>
        )
    }
    const reviewList = reviews.map((review) =>
    <div key={review.id}>
        
        <p>{review.date}</p>
        <p>{review.difficulty}</p>
        <p>{review.comment}</p>
        <p>{review.rating}</p>
        {userId === review.user_id ? <button onClick={() => onReviewDelete(review.id)}>delete</button> : null}
    </div>
    )
   
    function handleFormShow(){
       setShow(!show)
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
               user_id: userId,
               trail_id: id
           })
       })
       .then(r => r.json())
       .then(newReview => {
           setReviews(...reviews, newReview)
           setRating("")
           setComment("")
           setDifficulty("")
           setDate(today)
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
            setReviews(updatedReviews)
        })
    }


    return(
        <div>
            <div>
                <h1>{trail.name}</h1>
                <h2>{trail.location} ({trail.state})</h2>
                <h4>Route Type: {trail.route_type}</h4>
                <h4>Difficulty: {trail.difficulty}</h4>
                <h4>Distance: {trail.length} miles</h4>
                <h4>Elevation Gain: {trail.elevation_gain}</h4>
            </div>
            <div>
            {reviewList}
            </div>
            <div>
                <h3>Add A review</h3>
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
    )
}

export default TrailMainPage; 