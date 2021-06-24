
import {useEffect, useState} from 'react'
import Filter from './Filter'
import MapView from './MapView'
import TrailList from './TrailList'

function HomePage(){

    const [trails, setTrails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [mapView, setMapView] = useState(false)
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
            <p>Loading! </p>
        )
    }

    const unique = (x, i, a) => a.indexOf(x) == i;
    const allStates = trails.map((trail) => trail.state)
    const states = allStates.filter(unique)

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

    function handleMapView(){
        setMapView(!mapView)
    }

        
    return(
        <div className="mainPage">
            <h2 className="home">All Hiking Trails</h2>
            <div className="trailsHomeContainer">
                <Filter onStateChange={handleStateChange}
                onDifficultyChange={handleDifficultyChange}
                onLengthChange={handleLengthChange}
                states={states}
                selectedState={selectedState}
                onMapView={handleMapView}
                mapView={mapView}
                />
            </div>
                {mapView ? <MapView trails={trailsByLength}/> : null}
                {mapView? null: 
                <div className="trailsHome">
                <TrailList trails={trailsByLength}/>
                </div>}
        </div>
    )
}

export default HomePage;