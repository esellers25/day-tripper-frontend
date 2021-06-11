import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

function ProfilePage(){
    
    const dispatch = useDispatch()
    const name = useSelector((state) => state.userReducer.name)
    const location = useSelector((state) => state.userReducer.location)
    const userId = useSelector((state) => state.userReducer.id)
    const email = useSelector((state) => state.userReducer.email)
    // const profilePic = useSelector((state) => state.userReducer.profilePic)
    const [pageLoaded, setPageLoaded] = useState(false)
    const history = useHistory()
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
        .then(r => r.json())
        .then(userDetails => {
            dispatch({type: "setUserProfileInfo", payload: userDetails})
            setPageLoaded(true)
        })
    }, [dispatch])


    if (pageLoaded) {
    return(
        <div>
            <h2>Profile Page</h2>
            <h3>{name}</h3>
            <p>{location}</p>
            <a href={`mailto:${email}`}>Email</a><br></br>
            {userId === parseInt(id) ? <button onClick={() => history.push(`/user/${id}/edit`)}>Update my info</button> : null}
            <div>
                {userId === parseInt(id) ? <button onClick={() => history.push(`/user/${id}/lists`)}>See my lists</button> : null}
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