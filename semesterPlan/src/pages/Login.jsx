import { useAppContext } from '../AppProvider';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Button } from '@mui/material';
import PageCard from '../components/PageCard';

export default function Login() {
    const { token, setToken, user, setUser, logout } = useAppContext();

    return (
        <>
            <PageCard className="w-4/12 h-1/2">
                <h1 className="text-2xl font-bold mb-10">Sign in to get started</h1>

                <div className="flex justify-center w-full">
                    {!user && <GoogleLoginButton />}
                    {user && <button onClick={logout}>Log Out</button>}
                </div>
            </PageCard>
        </>
    );
}