import  Button  from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function TrailModal({trail, onHide, show}){
    const {name, difficulty, location, length, elevation_gain} = trail

    
    return(
        <div className="trailModal">
            <Modal 
            show={show}
            size='sm'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Title id="modalTitle">{name}</Modal.Title>
                <Modal.Body>
                    <h4>{location}</h4>
                    <p>Difficulty: {difficulty}</p>
                    <p>Length: {length} miles</p>
                    <p>Elevation Gain: {elevation_gain} ft</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TrailModal;