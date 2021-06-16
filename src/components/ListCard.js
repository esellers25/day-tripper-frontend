import Card from 'react-bootstrap/Card'

function ListCard({trailObj, onTrailDelete}){
    const {trail, trail_list} = trailObj
    
    return(
        <div>
            <Card>
                <Card.Title>{trail.name}</Card.Title>
                <Card.Subtitle>{trail.location} ({trail.state})</Card.Subtitle>
                <Card.Text>
                    Difficulty: {trail.difficulty}<br/>
                    Length: {trail.length} miles
                </Card.Text>
                <button onClick={() => onTrailDelete(trail_list)}>Remove from Favorites</button>
            </Card>
        </div>
    )
}

export default ListCard; 