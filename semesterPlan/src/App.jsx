
import { useState, useEffect, useContext } from 'react'
import './App.css'
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '@mui/material'
import { useAppContext } from './AppProvider';
import axios from 'axios'
import GoogleLoginButton from './components/GoogleLoginButton'
import NavBar from "./components/NavBar";
import AddEventModal from "./components/Modal";



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



  return (
    <>
    </>
  )
}

export default App
