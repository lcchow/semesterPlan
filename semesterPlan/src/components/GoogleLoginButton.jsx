import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '@mui/material'
import axios from 'axios'
import { useAppContext } from '../AppProvider';
import { useNavigate } from 'react-router-dom';
import Btn from './Btn';

const GoogleLoginButton = () => {
    const { setToken, getUserInfo } = useAppContext();
    const scopes = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";

    const navigate = useNavigate();

    // User google login and get access token
    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
          const tokens = await axios.post('http://localhost:5000/auth/google', { 
            code,
          });

          console.log("GOOGLE LOGIN",tokens)
      
          setToken(tokens.data.access_token);
          getUserInfo(tokens.data.access_token);
          navigate('/home');
        },
        flow: 'auth-code',
        scope: scopes,  // scope of google acccess
      });

    return (
        <Btn onClick={() => googleLogin()} className="font-bold w-2/4">Sign in with Google 🚀</Btn>
    );
};

export default GoogleLoginButton;