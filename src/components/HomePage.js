
import {useEffect, useState} from 'react'
import Filter from './Filter'
import TrailList from './TrailList'

function HomePage(){

    const [trails, setTrails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedLength, setSelectedLength] = useState("All")
    const [selectedDifficulty, setSelectedDifficulty] = useState("All")
    const [selectedState, setSelectedState] = useState("All")

    useEffect(() => {
        fetch("http://localhost:3000/trails")
        .then(r => r.json())
        .then(trailData => {
            setTrails(trailData)
            setIsLoaded(true)
        })
    }, [])

    if (!isLoaded) {
        return (
            <p>Loading!</p>
        )
    }

    const trailsByState = trails.filter((trail) => {
        if (selectedState === "All") {
            return true
        } else {
            return selectedState === trail.state
        }
    })

    const trailsByDifficulty = trailsByState.filter((trail) => {
        if (selectedDifficulty === "All") {
            return true
        } else {
            return selectedDifficulty === trail.difficulty
        }
    })

    const trailsByLength = trailsByDifficulty.filter((trail) => {
        if (selectedLength === "All") {
            return true
        } 
        else if (selectedLength === "2") {
            return trail.length < 2
        }
        else if (selectedLength === "4") {
            return trail.length >= 2 && trail.length < 4 
        }
        else {
            return trail.length >= 4 
        }
    })

    function handleStateChange(selectedState){
        setSelectedState(selectedState)
    }

    function handleDifficultyChange(selectedDifficulty){
        setSelectedDifficulty(selectedDifficulty)
    }

    function handleLengthChange(selectedLength){
        setSelectedLength(selectedLength)
    }

        
    return(
        <div className="trailsHomeContainer">
            <h2>All Hiking Trails</h2>
            <div className="trailsHome">
            <Filter onStateChange={handleStateChange}
            onDifficultyChange={handleDifficultyChange}
            onLengthChange={handleLengthChange}
            />
            <TrailList trails={trailsByLength}/>
            </div>
        </div>
    )
}

export default HomePage;