import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';

function AllUsers(){
    
    const [users, setUsers] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then(r => r.json())
        .then(resp => setUsers(resp))
    }, [])
    

    const userList = users.map((user) => 
        <div className="singleCard" key={user.id}>
            <img className="userCardPic" src={user.profile_picture} alt={user.name}/>
            <h2 onClick={() => history.push(`/user/${user.id}`)}>{user.username}</h2>
        </div>
    )
    
    return (
        <div className="userPage">
            <h2>All Users</h2>
            <div className="userCard">
            {userList}
            </div>
        </div>
    )
}

export default AllUsers; 