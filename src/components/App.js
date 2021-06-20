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
import TrailPhotos from './TrailPhotos';
import AddTrailForm from './AddTrailForm';


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
        if(resp.token && resp.user.lists.length > 0){
          dispatch({type: "setUserInfo", payload: resp})
        }
        else if(resp.token){
          dispatch({type: "userSignUp", payload: resp})
        }
      })
    }
  }, [dispatch])

 
  const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f5ecd0;
  }

  h1 {
    font-family: 'Asap Condensed', sans-serif;
    font-size: 4.6em;
    cursor: pointer;
    text-align: center;
    margin-bottom: 8px;
   
  }

  h1:hover {
    color: white;
    text-shadow: 2px 2px black;
  }

  h2 {
    font-family: 'Caveat', cursive;
    font-size: 3.2em;
    padding: 10px;
    padding-bottom: 20px;
  }
  h3 {
    font-family: 'Asap Condensed', sans-serif;
    font-size: 2.9em;
  }
  h4 {
    font-family: 'Asap Condensed', sans-serif;
  }
  h5 {
    font-family: 'Asap Condensed', sans-serif;
  }
  `
  
  return (
    <div>
      <GlobalStyle />
      <Header />
      <div className="bodynohead">
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
          <Route exact path="/trail/:id/photos">
            <TrailPhotos/>
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
          <Route exact path="/addTrail">
            <AddTrailForm/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
