import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

function UserHome(){
    
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.userReducer.lists)
    const name = useSelector((state) => state.userReducer.name)
    const location = useSelector((state) => state.userReducer.location)
    const email = useSelector((state) => state.userReducer.email)
    const currentUserId = useSelector((state) => state.userReducer.id)
    const profilePic = useSelector((state) => state.userReducer.profilePic)
    const [pageLoaded, setPageLoaded] = useState(false)
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
        .then(r => r.json())
        .then(userDetails => {
            dispatch({type: "setUserProfileInfo", payload: userDetails})
            setPageLoaded(true)
        })
    }, [])

    
    if (pageLoaded) {
    return(
        <div>
            <h2>Profile Page</h2>
            <h3>{name}</h3>
            <p>{location}</p>
            <a href={`mailto:${email}`}>Email</a>
            {currentUserId == id ? <button>Update my info</button> : null}
            <div>
                {/* <h3>{lists[0].title}</h3> */}
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

export default UserHome;