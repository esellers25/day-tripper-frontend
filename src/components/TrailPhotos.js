import {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import PhotoModal from './PhotoModal'
import { Button } from './style'

function TrailPhotos(){

    const {id} = useParams()
    const [photos, setPhotos] = useState([])
    const history = useHistory()
    
    const [isLoaded, setIsLoaded] = useState(false)
    
    useEffect(() => {
        fetch(`http://localhost:3000/trails/${id}`)
        .then(r => r.json())
        .then(resp => {
            setPhotos(resp.photos)
            setIsLoaded(true)
        })
    }, [id])


    let divStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignItems: 'space-between'
    }
    
    if(isLoaded) {

        let photoSet = photos.map((photo) => <PhotoModal key={photo.id} photo={photo}/>)

        return (
            <div>
                <h2 style={{textAlign: 'center'}}>Trail Photos</h2>
                <Button onClick={() => history.push(`/trail/${id}`)}>Back to trail</Button>
                <div style={divStyle}>
                {photoSet}
                </div>
            </div>
        )
    }
    else {
        return (
            <p>Loading!</p>
        )
    }
}

export default TrailPhotos; 