import React from 'react';

import { Routes, Route } from "react-router-dom";

import HomeScreen from './pages/HomeScreen/HomeScreen';
import LoginScreen from "./pages/LoginScreen/LoginScreen"
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen"
import Loader from './pages/LoaderScreen/LoaderScreen';
import ErrorScreen from './pages/ErrorScreen/ErrorScreen';

import useAuth from './hooks/useAuth';

import './App.css';
function App() {
  const { state: { isLoading, isError } } = useAuth()

  return (
    <div className={`app ${isLoading ? "app--hidden" : ""}`}>
      {isLoading && (
        <Loader />
      )}
      {isError.status && <ErrorScreen message={isError.message} />}
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<HomeScreen />} />
        <Route path="/profile/*" element={<ProfileScreen />} />
      </Routes>
    </div>
  );
}

export default App;
