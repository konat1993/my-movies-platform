import React, { useEffect } from 'react';

import { auth } from './firebase/firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

import HomeScreen from './pages/HomeScreen/HomeScreen';
import LoginScreen from "./pages/LoginScreen/LoginScreen"
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen"

import './App.css';
function App() {

  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  useEffect(() => {
    //Checking if authorization is OK to log in user automatically
    //it is a listener which listens any sort of authentication (persisted)
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log(userAuth)
        //user is logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        console.log("else")
        //user is not logged out
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/profile">
              <ProfileScreen />
            </Route>
          </Switch>
        )}
      </Router >
    </div>
  );
}

export default App;
