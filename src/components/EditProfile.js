import {useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form} from './style'

function EditProfile(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const name = useSelector((state) => state.userReducer.name)
    const username = useSelector((state) => state.userReducer.username)
    const location = useSelector((state) => state.userReducer.location)
    const email = useSelector((state) => state.userReducer.email)
    const profilePic = useSelector((state) => state.userReducer.profilePic)
    const [formInfo, setFormInfo] = useState({
        name: name,
        username: username,
        email: email,
        location: location,
        profile_picture: profilePic,
        password: ""
    })
    
    function handleChange(e){
        const key = e.target.name 
        const value = e.target.value 

        setFormInfo({
            ...formInfo, 
            [key]: value
        })
    }

    function handleEditSubmit(e){
        e.preventDefault();
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.token 
            },
            body: JSON.stringify(formInfo)
        })
        .then(r => r.json())
        .then(resp => {
            console.log(resp)
            dispatch({type: "edit_profile_info", payload: resp})
            history.push(`/user/${id}`)
        })
    }
    
    return(
        <div className="editcontainer">
            <h2>Edit profile details</h2>
            <Form onSubmit={handleEditSubmit} className="editform">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={formInfo.name} onChange={handleChange}></input>
                <label htmlFor="username" >Username</label>
                <input type="text" name="username" value={formInfo.username} onChange={handleChange}></input>
                <label htmlFor="email" >Email</label>
                <input type="text" name="email" value={formInfo.email} onChange={handleChange}></input>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" value={formInfo.location} onChange={handleChange}></input>
                <label htmlFor="profile_picture">Profile Picture</label>
                <input type="text" id="profilepic" name="profile_picture" value={formInfo.profile_picture} onChange={handleChange}></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formInfo.password} onChange={handleChange}></input>
                <Button type="submit">Save changes</Button>
            </Form>
        </div>
    )
}

export default EditProfile;