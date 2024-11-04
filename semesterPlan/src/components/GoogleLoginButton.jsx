import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '@mui/material'
import axios from 'axios'

const GoogleLoginButton = ({ setToken, setUser, getUserInfo }) => {

    const scopes = "https://www.googleapis.com/auth/calendar.readonly";

    // User google login and get access token
    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
          const tokens = await axios.post('http://localhost:5000/auth/google', { 
            code,
          });
      
          setToken(tokens.data.access_token);
          getUserInfo(tokens.data.access_token);
        },
        flow: 'auth-code',
        scope: scopes,  // scope of google acccess
      });

    return (
        <Button onClick={() => googleLogin()}>Sign in with Google 🚀</Button>
    );
};

export default GoogleLoginButton;