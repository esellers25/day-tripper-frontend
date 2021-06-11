
import {useEffect, useState} from 'react'
import TrailList from './TrailList'

function HomePage(){

    const [trails, setTrails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/trails")
        .then(r => r.json())
        .then(trailData => {
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