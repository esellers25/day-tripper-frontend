import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {SmallButton} from './style'
import Card from 'react-bootstrap/Card'
import TrailModal from './TrailModal'

function TrailCard({trail}){
    
    const {name, location, state, id} = trail 
    const lists = useSelector((state) => state.userReducer.lists)
    const trailList = useSelector((state) => state.userReducer.trailLists)
    const userId = useSelector((state) => state.userReducer.id)
    const history = useHistory()
    const [modalShow, setModalShow] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [disabled, setDisabled] = useState(false)

    let trailIds = trailList.map((trailObj) => trailObj.trail_id)

    function addFavorite(){
        fetch("http://localhost:3000/trail_lists", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                trail_id: id, 
                list_id: lists[0].id
            })
        })
        .then(r => r.json())
        .then(resp => {
            setFavorited(true) 
            setDisabled(true)
        })
    }

    let cardstyle = {
        width: '20rem',
        height: '25rem',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: '28px',
        paddingBottom: '0.5rem'
    }

    return(
        <div>
            <Card style={cardstyle}>
                <Card.Body></Card.Body>
                <Card.Title onClick={() => history.push(`/trail/${id}`)}>{name}</Card.Title>
                <Card.Subtitle>{location}</Card.Subtitle>
                <SmallButton secondary onClick={() => setModalShow(true)}>
                    Quick View
                </SmallButton>
                {trailIds.includes(id) ? <SmallButton secondary onClick={() => history.push(`/user/${userId}/lists`)}>See My Favorites</SmallButton> : <SmallButton secondary onClick={() => addFavorite()}>{favorited ? "Added!" : "Add to Favorites"}</SmallButton>}
                <TrailModal trail={trail} show={modalShow} onHide={() => setModalShow(false)}/>
            </Card>
        </div>
    )
}

export default TrailCard;