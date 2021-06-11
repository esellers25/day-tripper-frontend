import { useHistory, NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header(){

    const history = useHistory()
    const username = useSelector((state) => state.userReducer.username)
    const id = useSelector((state) => state.userReducer.id)

    function logOut(){
        localStorage.clear()
        history.push("/login")
    }

    return(
        <div>
            <h1>Day Tripper</h1>
            <div>
                <nav>
                    <NavLink to="/home">Browse Trails</NavLink>
                    {username !== "" ? <NavLink to="/login" onClick={logOut}>LogOut</NavLink> : <NavLink to="/login">Sign In</NavLink>}
                    {username !== "" ? <NavLink to={`/user/${id}`}>My Profile</NavLink> : null}
                </nav>
            </div>
            
        </div>
    )
}

export default Header;