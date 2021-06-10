import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

function TrailMainPage(){
    const {id} = useParams()
    const [trail, setTrail] = useState(null)
    const [show, setShow] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const username = useSelector((state) => state.userReducer.username)

    console.log(username)

    useEffect(() => {
        fetch(`http://localhost:3000/trails/${id}`)
        .then(r => r.json())
        .then(trailInfo => {
            setTrail(trailInfo) 
            setIsLoaded(true)
        })
    }, [])

    if (!isLoaded) {
        return (
            <p>Loading</p>
        )
    }

   function handleFormShow(){
       setShow(!show)
   }

    const reviewList = trail.reviews.map((review) =>
        <div key={review.id}>
            <h5>{review.user.username}</h5>
            <p>{review.date}</p>
            <p>{review.difficulty}</p>
            <p>{review.comment}</p>
            <p>{review.rating}</p>
        </div>
    )

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
                <button onClick={handleFormShow}>Review</button><br></br>
                {show && localStorage.token ? <p>testing</p> : "Log in to leave a review!"}
            </div>
        </div>
    )
}

export default TrailMainPage; 