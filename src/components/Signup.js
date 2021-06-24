import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'; 
import {useState} from 'react'; 
import {Button, SignUpForm} from './style'

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
        formData.append('bio', e.target[5].value)
        formData.append('password', e.target[6].value)
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
        <SignUpForm onSubmit={(e) => signUp(e)}>
            <label className="label" htmlFor="name">Name</label>
            <input name="name" type="text"/>
            <label className="label" htmlFor="username">Username</label>
            <input name="username" type="text"/>
            <label className="label" htmlFor="email">Email</label>
            <input name="email" type="text"/>
            <label className="label" htmlFor="profilepic">Profile Picture</label>
            <input name="profilepic" type="file" accept='image/*'/>
            <label className="label" htmlFor="location">Location</label>
            <input name="location" type="text"/>
            <label className="label" htmlFor="bio">Bio</label>
            <input name="bio" type="text"/>
            <label className="label" htmlFor="password">Password</label>
            <input name="password" type="password"/><br/>
            <Button type="submit">Submit</Button><br/>
            <h4>Already have an account?</h4>
            <Button onClick={handleLoginClick}>Login</Button>
        </SignUpForm><br></br>
    </div>
    )
}

export default Signup; 