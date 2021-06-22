import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import {Button} from './style';
import {useState} from 'react'

function PhotoModal({photo}){
    
    const {img_link, title} = photo 
    const [modalShow, setModalShow] = useState(false)

    let photoStyle = {
        width: '280px',
        height: '210px',
        margin: '10px',
        borderRadius: '4px'
    }

    let divStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }

    let modalStyle = {
        padding: "0.5rem"
    }
    
    return(
        <div>
            <div style={divStyle}>
                <img 
                style={photoStyle} 
                key={photo.id} 
                src={photo.img_link} 
                alt={photo.title} 
                onClick={() => setModalShow(true)}
                />
                <Container >
                    <Modal
                    show={modalShow}
                    size="xl"
                    centered
                    style={modalStyle}
                    >
                        <Modal.Body>
                            <Image fluid src={img_link} alt={title}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setModalShow(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default PhotoModal; 