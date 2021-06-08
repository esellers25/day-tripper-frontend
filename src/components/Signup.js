import {useHistory} from "react-router-dom";

function Signup(){

    const history = useHistory()

    function handleLoginClick(){
        history.push("/login")
    }

    function signUp(e){
        e.preventDefault()
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: e.target[0].value,
                username: e.target[1].value,
                email: e.target[2].value,
                profile_picture: e.target[3].value,
                location: e.target[4].value,
                password: e.target[5].value, 
            })
        })
        .then(r => r.json())
        .then(response => {
            console.log(response)
            history.push("/login")
            })
    }

    return(
        <div className="login-form">
        <h2>Signup for an Account</h2>
        <form onSubmit={(e) => signUp(e)}>
            <label htmlFor="name">Name</label>
            <input name="name" type="text"/>
            <label htmlFor="username">Username</label>
            <input name="username" type="text"/>
            <label htmlFor="email">Email</label>
            <input name="email" type="text"/>
            <label htmlFor="profilepic">Profile Picture</label>
            <input name="profilepic" type="text"/>
            <label htmlFor="location">Location</label>
            <input name="location" type="text"/>
            <label htmlFor="password">Password</label>
            <input name="password" type="password"/>
            <input type="submit"/>
        </form><br></br>
        <h4>Already have an account?</h4>
        <button onClick={handleLoginClick}>Login</button>
    </div>
    )
}

export default Signup; 