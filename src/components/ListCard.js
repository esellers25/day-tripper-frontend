import Card from 'react-bootstrap/Card'
import {useHistory} from 'react-router-dom'

function ListCard({trailObj, onTrailDelete, pageLoaded, photos}){
    
    const {trail, trail_list} = trailObj
    const history = useHistory()

    let cardStyle = {
        width: '19rem',
        height: '23rem',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: '28px',
        paddingBottom: '0.5rem'
    }

    let cardImage = {
        height: '11rem',
        paddingBottom: '10px',
    }

    return(
        <div >
            <Card style={cardStyle}>
                {pageLoaded && photos.length > 0 ? <Card.Img style={cardImage} variant="top" src={photos[0].img_link} alt={photos[0].title}/> : null}
                <Card.Title className="cardtitle" onClick={() => history.push(`/trail/${trail.id}`)}>{trail.name}</Card.Title>
                <Card.Subtitle>{trail.location}</Card.Subtitle>
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