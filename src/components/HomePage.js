import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'

function HomePage(){

    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:3000/trails")
        .then(r => r.json())
        .then(trailData => console.log(trailData))
    }, [])


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