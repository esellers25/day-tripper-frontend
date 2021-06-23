import {useHistory, useParams} from 'react-router-dom'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {Button} from './style'
import { Comment, Header, Rating } from 'semantic-ui-react'

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

    function handleRating(e, {rating, maxRating}){
        setRating({rating, maxRating})
    }

    const allRatings = reviews.map((review) => review.rating)
    const initialAvg = allRatings.length > 0 ? allRatings.reduce((a,b) => a + b, 0)/allRatings.length : 0
    const finalAvg = parseFloat(initialAvg).toFixed(1)

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
                rating: rating.rating,
                difficulty: difficulty,
                date: date,
                trail_id: id,
                user_id: userId
            })
        })
        .then(r => r.json())
        .then(newReview => {
            onNewReview(newReview)
            setRating(0)
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
        <Comment id="commentblock" key={review.id}>
            <Comment.Avatar src={review.avatar}/>
            <Comment.Content id="reviewcontent">
                <Comment.Author id="author" onClick={() => history.push(`/user/${review.user_id}`)}>{review.review_author}</Comment.Author>
                <Comment.Metadata id="metadata">
                    <div>{review.date}</div>
                    <div>Difficulty: {review.difficulty}</div>
                    <div>Rating: {review.rating}</div>
                </Comment.Metadata>
                <Comment.Text>{review.comment}</Comment.Text>
            {userId === review.user_id ? <Button onClick={() => onReviewDelete(review.id)}>delete</Button> : null}
            </Comment.Content>
        </Comment>
        )
    
    return(
        <div>
        <Comment.Group>
            <Header id="reviewheader" as='h2' dividing>Reviews (Average Rating: {finalAvg})</Header>
        {reviewList}
        </Comment.Group>
        <div>
            <h3>Add a review</h3>
            {localStorage.token ? <Button secondary onClick={handleFormShow}>Review</Button> : "Log in to leave a review!"}
            {show ? 
            <div className="reviewForm">
                <form onSubmit={onReviewSubmit}>
                    <label htmlFor="rating">Rating</label>
                    <Rating value={rating} onRate={handleRating} name="rating" type="number" maxRating={5} clearable></Rating>
                    <label htmlFor="difficulty">Difficulty</label>
                    <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="" disabled selected>Select</option>
                        <option value="easy">Easy</option>
                        <option value="moderate">Moderate</option>
                        <option value="hard">Hard</option>
                    </select>
                    <label className="comment" htmlFor="comment">Comment</label>
                    <textarea className="comment" value={comment} onChange={(e) => setComment(e.target.value)} name="comment" placeholder="Write your review here" rows={5} type="textarea"></textarea>
                    <label htmlFor="date">Date</label>
                    <input value={date} onChange={(e) => setDate(e.target.value)} id="today" name="date" type="date"></input>
                    <Button type="submit">Submit my review</Button>
                </form>
            </div> : 
            null}
        </div>
        </div>
    )
}

export default TrailReviews; 