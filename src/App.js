import React, { useEffect } from 'react';

import { auth } from './firebase/firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { useDispatch } from 'react-redux';
import { login, logout, selectIsLoading, selectIsSubscribed, setLoading } from './features/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

import HomeScreen from './pages/HomeScreen/HomeScreen';
import LoginScreen from "./pages/LoginScreen/LoginScreen"
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen"

import './App.css';
function App() {

  const user = useSelector(selectUser)
  const isLoading = useSelector(selectIsLoading)
  const isSubscribed = useSelector(selectIsSubscribed)

  const history = useHistory()

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
        setTimeout(() => {
          dispatch(setLoading(false))
        }, 2000);

      }
    })
    return unsubscribe
  }, [dispatch])

  console.log("isLoading", isLoading)
  console.log("isSubscribed", isSubscribed)
  useEffect(() => {
    if (!isLoading && user && isSubscribed) {
      history.push("/")
    } else if (!isLoading && user && !isSubscribed) {
      history.push("/profile")
    } else if (!isLoading && !user) {
      history.push("/login")
    }
  }, [isLoading, isSubscribed, history, user])

  // useEffect(() => {
  //   user && isSubscribed && dispatch(setLoading(false))
  // }, [user, dispatch, isSubscribed])
  return (
    <div className="app">
      {isLoading && (
        <div className="loader">
          <h2>LOADING...</h2>
        </div>
      )}
      {/* {!user ? (
        <LoginScreen />
      ) : ( */}
      <Switch>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/profile">
          <ProfileScreen />
        </Route>
      </Switch>
      {/* )} */}
    </div>
  );
}

export default App;
