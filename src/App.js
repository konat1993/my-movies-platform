import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomeScreen from './pages/HomeScreen/HomeScreen';
import Login from "./pages/LoginScreen/LoginScreen"

import './App.css';
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </Router >
    </div>
  );
}

export default App;
