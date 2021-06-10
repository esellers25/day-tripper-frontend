import '../App.css';
import {useState, useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import HomePage from './HomePage';
import UserHome from './UserHome';
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const [user, setUser] = useState(null)
  // const display = useSelector((state) => state.trailReducer.display)
  const dispatch = useDispatch()

  if(localStorage.token){
    fetch("http://localhost:3000/keep_logged_in", {
      method: "GET",
      headers: {
        "Authorization": localStorage.token
      }
    })
    .then(r => r.json())
    .then(resp => {
      if(resp.token){
        dispatch({type: "setUserInfo", payload: resp})
      }
    })
  }
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user")
  //   if (loggedInUser) {
  //     const currentUser = {username: localStorage.getItem("username"),
  //     id: localStorage.getItem("id"),
  //     token: localStorage.getItem("token")}
  //     setUser(currentUser)
  //   }
  // }, [])

  
  // function onLogin(userInfo){
  //   setUser(userInfo)
  // }
  
  return (
    <Switch>
      <Route exact path="/login">
      <Login />
      </Route>
      <Route  exact path="/">
        <Signup/>
      </Route>
      <Route exact path="/home">
        <HomePage />
      </Route>
      <Route exact path="/user/:id">
        <UserHome />
      </Route>
    </Switch>
  );
}

export default App;
