import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import TrailModal from './TrailModal'

function TrailCard({trail}){
    
    const {name, location, state, id} = trail 
    const lists = useSelector((state) => state.userReducer.lists)
    const trailList = useSelector((state) => state.userReducer.trailLists)
    const history = useHistory()
    const [modalShow, setModalShow] = useState(false)

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
        .then(resp => console.log(resp))
    }

    return(
        <div>
            <Card>
                <Card.Header></Card.Header>
                <Card.Body></Card.Body>
                <Card.Title onClick={() => history.push(`/trail/${id}`)}>{name}</Card.Title>
                <Card.Subtitle>{location}</Card.Subtitle>
                <p>{state}</p>
                {trailIds.includes(id) ? <Button>See All Favorites</Button> : <Button onClick={() => addFavorite()}>Add to Favorites</Button>}
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Quick View
                </Button>
                <TrailModal trail={trail} show={modalShow} onHide={() => setModalShow(false)}/>
            </Card>
        </div>
    )
}

export default TrailCard;