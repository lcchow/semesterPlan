import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ setToken, setUser, getUserInfo }) => {
    const handleLoginSuccess = (credentialResponse) => {
        console.log("Login successful, Token:", credentialResponse.credential);
        console.log(credentialResponse);
        setUser(credentialResponse);
        setToken(credentialResponse.credential);
        getUserInfo(credentialResponse.credential);
    };

    const handleLoginError = (error) => {
        console.error("Login failed:", error);
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
        />
    );
};

export default GoogleLoginButton;