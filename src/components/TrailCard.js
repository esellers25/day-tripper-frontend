import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import TrailModal from './TrailModal'

function TrailCard({trail}){
    
    const {name, location, state, id} = trail 
    const history = useHistory()
    const [modalShow, setModalShow] = useState(false)

    return(
        <div>
            <Card>
                <Card.Header></Card.Header>
                <Card.Body></Card.Body>
                <Card.Title onClick={() => history.push(`/trail/${id}`)}>{name}</Card.Title>
                <Card.Subtitle>{location}</Card.Subtitle>
                <p>{state}</p>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Quick View
                </Button>
                <TrailModal trail={trail} show={modalShow} onHide={() => setModalShow(false)}/>
            </Card>
        </div>
    )
}

export default TrailCard;