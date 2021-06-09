import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function UserHome({signedInUser}){
    
    const [profile, setProfile] = useState(null)
    const [pageLoaded, setPageLoaded] = useState(false)
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
        .then(r => r.json())
        .then(userDetails => {
            setProfile(userDetails)
            setPageLoaded(true)
        })
    }, [])
    
    if (pageLoaded) {
    return(
        <div>
            <h2>User Home Page</h2>
            <img src={profile.profile_picture} alt={profile.name}/>
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