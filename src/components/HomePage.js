import {useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import TrailList from './TrailList'

function HomePage(){

    const dispatch = useDispatch()
    // const trails = useSelector((state) => state.trailReducer.trails)
    const [trails, setTrails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/trails")
        .then(r => r.json())
        .then(trailData => {
            // dispatch({type: "setTrailInfo", payload: trailData})
            setTrails(trailData)
            setIsLoaded(true)
        })
    }, [])

        
    return(
        <div>
            <h2>Browse All Hiking Trails</h2>
            <TrailList trails={trails}/>
        </div>
    )
}

export default HomePage;