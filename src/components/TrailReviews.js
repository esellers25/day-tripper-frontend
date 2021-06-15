import {useHistory, useParams} from 'react-router-dom'
import {useState} from 'react'
import {useSelector} from 'react-redux'

function TrailReviews({reviews, onNewReview, onDeleteReview}){
    let today = new Date().toISOString().substr(0, 10);

    const history = useHistory()
    const {id} = useParams()

    const userId = useSelector((state) => state.userReducer.id)
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [rating, setRating] = useState("")
    const [date, setDate] = useState(today)

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
                trail_id: id,
                user_id: userId
            })
        })
        .then(r => r.json())
        .then(newReview => {
            onNewReview(newReview)
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
            onDeleteReview(id)
        })
    }

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
    
    return(
        <>
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
        </>
    )
}

export default TrailReviews; 