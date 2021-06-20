import Card from 'react-bootstrap/Card'
import {useHistory} from 'react-router-dom'

function ListCard({trailObj, onTrailDelete}){
    const {trail, trail_list} = trailObj
    const history = useHistory()
    
    return(
        <div className="favList">
            <Card>
                <Card.Title className="cardtitle" onClick={() => history.push(`/trail/${trail.id}`)}>{trail.name}</Card.Title>
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