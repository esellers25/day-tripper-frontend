

function ListCard({trailObj, onTrailDelete}){
    const {trail, trail_list} = trailObj
    
    return(
        <div>
            <h2>{trail.name}</h2>
            <h3>{trail.location} ({trail.state})</h3>
            <p>Difficulty: {trail.difficulty} Length: {trail.length}ft</p>
            <button onClick={() => onTrailDelete(trail_list)}>Remove from Favorites</button>
        </div>
    )
}

export default ListCard; 