import { MapButton, ResetButton } from "./style"

function Filter({onStateChange, onLengthChange, onDifficultyChange, states, onMapView, mapView}){
    
    function handleStateChange(e){
        onStateChange(e.target.value)
    }

    function handleDifficultyChange(e){
        onDifficultyChange(e.target.value)
    }

    function handleLengthChange(e){
        onLengthChange(e.target.value)
    }

    function resetFilters(){
        onStateChange("All")
        onDifficultyChange("All")
        onLengthChange("All")
    }
    
    const stateOptions = states.map((state) => <option key={state} value={state}>{state}</option>)

    return(
        <div className="filterNav">
            <MapButton onClick={onMapView}>{mapView ? "List View" : "Map View"}</MapButton>
            <div className="filterBar">
                <h4>Filter</h4>
                <label htmlFor="state-filter">State</label>
                <select className="filterInputs" name="state-filter" onChange={handleStateChange}>
                    <option value="All">All</option>
                    {stateOptions}
                </select>
                <label  htmlFor="difficulty-filter">Difficulty Level</label>
                <select className="filterInputs" name="difficulty-filter" onChange={handleDifficultyChange}>
                    <option value="All">All</option>
                    <option value="hard">Hard</option>
                    <option value="moderate">Moderate</option>
                    <option value="easy">Easy</option>
                </select>
                <label  htmlFor="length-filter">Trail Length</label>
                <select className="filterInputs" name="length-filter" onChange={handleLengthChange}>
                    <option value="All">All</option>
                    <option value="2">Under 2 miles</option>
                    <option value="4">2-4 Miles</option>
                    <option value="4.1">Over 4 miles</option>
                </select>
                <ResetButton onClick={resetFilters}>Reset</ResetButton>
            </div>
        </div>
    )
}

export default Filter; 