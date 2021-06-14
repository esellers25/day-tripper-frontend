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
        <div>
            <div>
                <h2>FILTER</h2>
            </div>
            <div>
                <select name="state-filter" onChange={handleStateChange}>
                    <option value="All">All</option>
                    <option value="ME">Maine</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NY">New York</option>
                    <option value="VT">Vermont</option>
                </select>
                <select name="difficulty-filter" onChange={handleDifficultyChange}>
                    <option value="All">All</option>
                    <option value="hard">hard</option>
                    <option value="moderate">moderate</option>
                    <option value="easy">easy</option>
                </select>
                <select name="length-filter" onChange={handleLengthChange}>
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