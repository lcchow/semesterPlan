import { useAppContext } from '../AppProvider';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Button } from '@mui/material';

export default function Login() {
    const { token, setToken, user, setUser, logout } = useAppContext();

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl">Login</h1>

                <div>
                    {!user && <GoogleLoginButton />}
                    {user && <Button onClick={logout}>Log Out</Button>}
                </div>

            </div>
        </>
    );
}