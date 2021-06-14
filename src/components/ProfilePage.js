import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

function ProfilePage(){
    
    const dispatch = useDispatch()
    const [pageLoaded, setPageLoaded] = useState(false)
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
    const userId = useSelector((state) => state.profileReducer.id)
    const email = useSelector((state) => state.profileReducer.email)
    const currentUserId = useSelector((state) => state.userReducer.id)
    // const profilePic = useSelector((state) => state.profileReducer.profilePic)

    if (pageLoaded) {
    return(
        <div>
            <h2>Profile Page</h2>
            <h3>{name}</h3>
            <h5>Username : {username}</h5>
            <p>{location}</p>
            <a href={`mailto:${email}`}>Email</a><br></br>
            {currentUserId === parseInt(id) ? <button onClick={() => history.push(`/user/${id}/edit`)}>Update my info</button> : null}
            <div>
                {currentUserId === parseInt(id) ? <button onClick={() => history.push(`/user/${id}/lists`)}>See Favorited Trails</button> : null}
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