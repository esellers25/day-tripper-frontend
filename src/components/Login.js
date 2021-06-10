import {useHistory} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from 'react-redux'; 

function Login(){

    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrormessage] = useState("")
    const dispatch = useDispatch()
    
    function logIn(e){
        e.preventDefault()
        
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(r => r.json())
        .then(resp => {
            if(resp.error){
                setErrormessage(resp.error)
            } else {
                dispatch({type: "setUserInfo", payload: resp})
                localStorage.token = resp.token
                history.push("/home")
            }
            // localStorage.setItem('username', userInfo.username) 
            // localStorage.setItem('token', userInfo.token)
            // localStorage.setItem('user', userInfo.id)
            // localStorage.setItem('id', userInfo.id)
            // handleLogin(userInfo)
            // history.push("/home")
        })
    }

    function handleSignInClick(){
        history.push("/")
    }

    return(
        <div className="login-form">
            <h2>Login</h2>
            <p>{errorMessage}</p>
            <form onSubmit={(e) => logIn(e)}>
                <label>Username</label>
                <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input type="submit"/>
            </form>
            <h4>Need an account?</h4>
            <button onClick={handleSignInClick}>Sign up for an account</button>
        </div>
    )
}

export default Login; 