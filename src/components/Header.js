import { useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from './logo.png'



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
            <div className="brandelements">
                <div className="brandelements">
                <img className="logo" src={logo} alt="Day Tripper"/>
                <h1 onClick={() => history.push("/home")}>Day Tripper</h1>
                </div>
                <Navbar>
                    <Nav id="navbar" className="ml-auto">
                        <Nav.Link href="/home">Browse Trails</Nav.Link>
                        <Nav.Link href="/addtrail">Add a Trail</Nav.Link>
                        {username !== "" ? <Nav.Link onClick={() => history.push("/allusers")}>Users</Nav.Link>: null}
                        {username !== "" ? 
                        <NavDropdown title="My Profile" href={`/user/${id}`}>
                            <NavDropdown.Item onClick={() => history.push(`/user/${id}`)}>View my details</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push(`/user/${id}/edit`)}>Edit my details</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push(`/user/${id}/lists`)}>See favorited trails</NavDropdown.Item>
                        </NavDropdown>
                         : null}
                        {username !== "" ? <Nav.Link href="/login" onClick={logOut}>LogOut</Nav.Link> : <Nav.Link href="/login">Sign In</Nav.Link>}
                    </Nav>
                </Navbar>
            </div>
            
        </div>
    )
}

export default Header;