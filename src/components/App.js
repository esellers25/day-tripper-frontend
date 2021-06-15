import '../App.css';
import {useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import HomePage from './HomePage';
import {useDispatch } from 'react-redux'
import Header from './Header';
import TrailMainPage from './TrailMainPage';
import ProfilePage from './ProfilePage';
import FavList from './FavList';
import EditProfile from './EditProfile';
import { createGlobalStyle } from "styled-components";

function App() {
  
  const dispatch = useDispatch()

  useEffect(() => {
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
  }, [dispatch])
  
  const GlobalStyle = createGlobalStyle`
  body {
    background-color: #7DA3A1;
    margin: 0% 7% 5% 7%;
  }

  h1 {
    font-family: 'Caveat', cursive;
    font-size: 7em;
    cursor: pointer;
    text-align: center;
  }
  `
  
  return (
    <div>
      <GlobalStyle />
      <Header />
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
        <Route exact path="/trail/:id">
          <TrailMainPage />
        </Route>
        <Route exact path="/user/:id">
          <ProfilePage />
        </Route>
        <Route exact path="/user/:id/edit">
          <EditProfile/>
        </Route>
        <Route exact path="/user/:id/lists">
          <FavList/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
