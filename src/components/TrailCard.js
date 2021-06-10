function TrailCard({trail}){
    
    const {name, location, state} = trail 

    return(
        <div>
            <h2>{name}</h2>
            <h3>{location}</h3>
            <p>{state}</p>
        </div>
    )
}

export default TrailCard;