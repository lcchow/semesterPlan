import { createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider, Route} from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import './App.css'
import Home from './pages/Home'
import Summary from './pages/Summary'
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '@mui/material'
import { useAppContext } from './AppProvider';
import axios from 'axios'
import GoogleLoginButton from './components/GoogleLoginButton'
import NavBar from "./components/NavBar";
import AddEventModal from "./components/Modal";
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';

function App() {
  const { token, setToken, user, setUser, logout } = useAppContext();



// Get list of Google calendars owned by user
const getCalendars = async (e) => {
  try {
    const response = await fetch('http://localhost:5000/calendar/list', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const calendars = await response.json();
    console.log("Calendars:", calendars);
  } catch (error) {
    console.error("Error fetching user calendars:", error);
  }
};

  //React Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    }, 
    {
      path: "/home",
      element: (
        <ProtectedRoute 
          element={<Home />}
        />
      )
    }, 
    {
      path: "/summary",
      element: (
        <ProtectedRoute 
          element={<Summary />}
        />

      ),
    }, 

  ])

  return (
    <>
      <div>
        {/* {!user && <GoogleLoginButton />} */}
        {user && <Button onClick={logout}>Log Out</Button>}
      </div>

      <Button onClick={getCalendars}>CALENDARS</Button>

      <NavBar />
      <RouterProvider router={router} />
        
    </>
  )
}

export default App
