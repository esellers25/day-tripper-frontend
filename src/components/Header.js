import { useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'

function Header(){

    const history = useHistory()
    const username = useSelector((state) => state.userReducer.username)
    const id = useSelector((state) => state.userReducer.id)

    function logOut(){
        localStorage.clear()
        history.push("/login")
    }

    return(
        <div className="header">
            <h1>Day Tripper</h1>
            <Navbar>
                <Nav id="navbar">
                    <Nav.Link href="/home">Browse Trails</Nav.Link>
                    <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                    {username !== "" ? <Nav.Link href="/login" onClick={logOut}>LogOut</Nav.Link> : <Nav.Link href="/login">Sign In</Nav.Link>}
                    {username !== "" ? <Nav.Link href={`/user/${id}`}>My Profile</Nav.Link> : null}
                </Nav>
            </Navbar>
            
        </div>
    )
}

export default Header;