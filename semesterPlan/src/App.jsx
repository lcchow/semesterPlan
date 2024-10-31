import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Summary from './pages/Summary'
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '@mui/material'
import axios from 'axios'
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const login = useGoogleLogin({
    onSuccess: (response) => setUser(response),
    onError: (error) => console.log("Login Error:", error)
  })

  const logout = () => {
    googleLogout()
    console.log("Logout successful")
    setUserProfile(null)
    setUser(null)
    
  }

  useEffect (
    () => {
      if (user) {
        console.log("USER:", user)
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.credential}`,
          {
            headers: {
              Authorization: `Bearer ${user.accesstoken}`,
              Accept: 'application/json'
            }
          })
          .then ((response) => {
            setUserProfile(response.data)
          })
          .catch((error) => console.log(error))
      }
    },
    [user]
  )

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
      
      {/* { userProfile ? (
        <div>
          <h3>Logged in as: {userProfile.name}, {userProfile.email}</h3>
        

          <Button onClick={logout}>Log Out</Button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess= { 
          loginResponse => { 
            console.log("Login Successful:",loginResponse)
            setUser(loginResponse)
          }
          }
          onError={
            error => { console.log("Login Failed:", error) }
          }
        />
      )} */}

      <NavBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
