import {useHistory} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from 'react-redux'; 
import {SmallForm} from './style'

function Login(){

    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
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
                setErrorMessage(resp.error)
            } else {
                dispatch({type: "setUserInfo", payload: resp})
                localStorage.token = resp.token
                history.push("/home")
            }
        })
    }

    function handleSignInClick(){
        history.push("/")
    }

    return(
        <div className="login-form">
            <h2>Login</h2>
            <p>{errorMessage}</p>
            <SmallForm onSubmit={(e) => logIn(e)}>
                <label>Username</label>
                <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <input type="submit"/><br/>
                <h4>Need an account?</h4>
                <button onClick={handleSignInClick}>Sign up for an account</button>
            </SmallForm>
        </div>
    )
}

export default Login; 