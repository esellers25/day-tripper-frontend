import '../App.css';
import {useState, useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import HomePage from './HomePage';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      const currentUser = {username: localStorage.getItem("username"),
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token")}
      setUser(currentUser)
    }
  }, [])

  function onLogin(userInfo){
    setUser(userInfo)
  }
  
  return (
    <Switch>
      <Route exact path="/login">
      <Login handleLogin={onLogin}/>
      </Route>
      <Route  exact path="/">
        <Signup/>
      </Route>
      <Route exact path="/home">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default App;
