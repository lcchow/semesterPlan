import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Summary from './pages/Summary'
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '@mui/material'
import axios from 'axios'
import GoogleLoginButton from './components/GoogleLoginButton'
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);

  // const login = useGoogleLogin({
  //   onSuccess: (response) => setUser(response),
  //   onError: (error) => console.log("Login Error:", error)
  // })

  const logout = () => {
    googleLogout();
    console.log("Logout successful");
    setUserProfile(null);
    setUser(null);
    setToken(null);
    
  }

  const getUserInfo = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/userinfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }), // Send token in the request body
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userInfo = await response.json();
      console.log("User Information:", userInfo);
      return userInfo;
  } catch (error) {
      console.error("Error fetching user info:", error);
  }
};

  //React Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    }, 
    {
      path: "/summary",
      element: <Summary />,
    }, 

  ])

  return (
    <>
      <div>
        <GoogleLoginButton setToken={setToken} />
        {/* <GoogleLoginButton setToken={setToken} setUser={setUser} getUserInfo={getUserInfo}/> */}
        {/* {token && <Button onClick={logout}>Log Out</Button>} */}
      </div>

      <NavBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
