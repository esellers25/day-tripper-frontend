function Filter({onStateChange, onLengthChange, onDifficultyChange}){
    
    function handleStateChange(e){
        onStateChange(e.target.value)
    }

    function handleDifficultyChange(e){
        onDifficultyChange(e.target.value)
    }

    function handleLengthChange(e){
        onLengthChange(e.target.value)
    }
    
    
    return(
        <div className="filterNav">
            <div>
            </div>
            <div className="filterBar">
                <h4>Filter Trails</h4>
                <label htmlFor="state-filter">State</label>
                <select className="filterInputs" name="state-filter" onChange={handleStateChange}>
                    <option value="All">All</option>
                    <option value="ME">Maine</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NY">New York</option>
                    <option value="VT">Vermont</option>
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
            </div>
        </div>
    )
}

export default Filter; 