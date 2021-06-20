import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'; 
import {useState} from 'react'; 
import {Form} from './style'

function Signup(){

    const history = useHistory()
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")

    function handleLoginClick(){
        history.push("/login")
    }

    function signUp(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', e.target[0].value)
        formData.append('username', e.target[1].value)
        formData.append('email', e.target[2].value)
        formData.append('profile_picture', e.target[3].files[0])
        formData.append('location', e.target[4].value)
        formData.append('password', e.target[5].value)
        fetch("http://localhost:3000/users", {
            method: "POST",
            body: formData
        })
        .then(r => r.json())
        .then(resp => {
            if(resp.error){
                setErrorMessage(resp.error)
            } else {
                dispatch({type: "userSignUp", payload: resp})
                localStorage.token = resp.token
                history.push("/home")
            }
        })
    }

    return(
        <div className="login-form">
        <h2>Signup for an Account</h2>
        <p>{errorMessage}</p>
        <Form onSubmit={(e) => signUp(e)}>
            <label htmlFor="name">Name</label>
            <input name="name" type="text"/>
            <label htmlFor="username">Username</label>
            <input name="username" type="text"/>
            <label htmlFor="email">Email</label>
            <input name="email" type="text"/>
            <label htmlFor="profilepic">Profile Picture</label>
            <input name="profilepic" type="file" accept='image/*'/>
            <label htmlFor="location">Location</label>
            <input name="location" type="text"/>
            <label htmlFor="password">Password</label>
            <input name="password" type="password"/><br/>
            <input type="submit"/><br/>
            <h4>Already have an account?</h4>
            <button onClick={handleLoginClick}>Login</button>
        </Form><br></br>
    </div>
    )
}

export default Signup; 