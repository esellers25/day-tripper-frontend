import {useHistory} from 'react-router-dom'

function HomePage(){

    const history = useHistory()
    
    function logOut(){
        localStorage.clear()
        history.push("/login")
    }
    
    return(
        <div>
            <h1>HOME PAGE</h1>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}

export default HomePage;