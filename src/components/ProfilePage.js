import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from './style';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function ProfilePage(){
    
    const dispatch = useDispatch()
    const [pageLoaded, setPageLoaded] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [img, setImg] = useState(null)
    const history = useHistory()
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
        .then(r => r.json())
        .then(userDetails => {
            dispatch({type: "setProfileInfo", payload: userDetails})
            setPageLoaded(true)
        })
    }, [id])

    const name = useSelector((state) => state.profileReducer.name)
    const username = useSelector((state) => state.profileReducer.username)
    const location = useSelector((state) => state.profileReducer.location)
    const email = useSelector((state) => state.profileReducer.email)
    const currentUserId = useSelector((state) => state.userReducer.id)
    const profilePic = useSelector((state) => state.profileReducer.profilePic)

    function handleEditForm(e){
        setEditForm(!editForm)
    }

    function handlePhotoChange(e){
        setImg(e.target.files[0])
    }

    function handlePicSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('profile_picture', img)
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.token
            },
            body: formData
        })
        .then(r => r.json())
        .then(resp => {
            dispatch({type: "edit_profile_info", payload: resp})
            setEditForm(false)
            setImg(null)
        })
    }

    let photoStyle = {
       
    }

    if (pageLoaded) {
    return(
        <div className="profilepage">
            <h2>User Details</h2>
            <div className="profiledetails">
                <div className="profilestats">
                    <img className="profilepicture" src={profilePic}/><br/>
                    <div className="profilelist">
                    <h2>{name}</h2>
                    <h5>Username : {username}</h5>
                    <p>{location}</p>
                    <ButtonGroup vertical>
                        <Button as='a' href={`mailto:${email}`}>Email</Button><br/>
                        {currentUserId === parseInt(id) ? <Button onClick={handleEditForm}>Change my photo</Button> : null}
                        {editForm ? 
                        <form onSubmit={handlePicSubmit}>
                            <label htmlFor="image">File</label>
                            <input type="file" accept='image/*' name="image" multiple={false} onChange={handlePhotoChange}></input>
                            <Button>Add photo</Button>
                        </form>
                        : null}
                        {currentUserId === parseInt(id) ? <Button onClick={() => history.push(`/user/${id}/edit`)}>Update my info</Button> : null}<br/>
                        {currentUserId === parseInt(id) ? <Button onClick={() => history.push(`/user/${id}/lists`)}>See Favorited Trails</Button> : null}
                    </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
    }
    else {
        return(
            <p>Loading</p>
        )
    }
}

export default ProfilePage;