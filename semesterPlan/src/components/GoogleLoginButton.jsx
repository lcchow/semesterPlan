import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '@mui/material'
import axios from 'axios'

const GoogleLoginButton = ({ setToken, setUser, getUserInfo }) => {
    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
          const tokens = await axios.post('http://localhost:5000/auth/google', { 
            code,
          });
      
          console.log(tokens);
          setToken(tokens.data.access_token);
          console.log(tokens.data.access_token);
        },
        flow: 'auth-code',
      });

    return (
        <Button onClick={() => googleLogin()}>Sign in with Google 🚀</Button>
    );
};

export default GoogleLoginButton;