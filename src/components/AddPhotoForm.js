import {useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {Button, ButtonGroup} from './style'

function AddPhotoForm(){

    const {id} = useParams()
    const userId = useSelector((state) => state.userReducer.id)
    let today = new Date().toISOString().substr(0, 10);
    const [photoDisplay, setPhotoDisplay] = useState(false)
    const [message, setMessage] = useState(null)
    const [title, setTitle] = useState("")
    const [img, setImg] = useState(null)

    function handlePhotoDisplay(){
        if(userId) {
            return (
                setPhotoDisplay(!photoDisplay)
            )
        } else {
            return (
                setMessage("Login to post a photo!")
            )
        }
    }

    function handlePhotoChange(e){
        setImg(e.target.files[0])
    }

    function addPhoto(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('img_link', img)
        formData.append('title', title)
        formData.append('date', today)
        formData.append('user_id', userId)
        formData.append('trail_id', id)
        fetch("http://localhost:3000/photos", {
            method: "POST",
            body: formData
        })
        .then(r => r.json())
        .then(resp => {
            setMessage(resp.message)
            setPhotoDisplay(false)
            setTitle("")
        })
    }


    return(
        <>
            <Button onClick={() => handlePhotoDisplay()}>Upload a photo</Button>
                <p>{message}</p>
                {photoDisplay ? 
                <div>
                    <form onSubmit={addPhoto}>
                        <label htmlFor="title">Title</label>
                        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <label htmlFor="image">File</label>
                        <input type="file" accept='image/*' name="image" multiple={false} onChange={handlePhotoChange}></input>
                        <Button>Add photo</Button>
                    </form>
                </div> : 
                null}
        </>
    )
}

export default AddPhotoForm;