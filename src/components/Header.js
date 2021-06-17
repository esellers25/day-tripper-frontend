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

    // let photoStyle = {
    //     width: 'auto',
    //     height: '50px',
    //     margin: '2px',
    // }


    return(
        <div className="header">
            <h1>Day Tripper</h1>
            <Navbar>
                <Nav id="navbar" className="ml-auto">
                    <Nav.Link href="/home">Browse Trails</Nav.Link>
                    <Nav.Link href="/addtrail">Add a Trail</Nav.Link>
                    {username !== "" ? <Nav.Link href={`/user/${id}`}>My Profile</Nav.Link> : null}
                    {username !== "" ? <Nav.Link href="/login" onClick={logOut}>LogOut</Nav.Link> : <Nav.Link href="/login">Sign In</Nav.Link>}
                </Nav>
            </Navbar>
            
        </div>
    )
}

export default Header;