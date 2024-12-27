import { useAppContext } from '../AppProvider';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Button } from '@mui/material';
import PageCard from '../components/PageCard';
import planPhoto from '../assets/plan-photo2.jpg';

export default function Login() {
    const { token, setToken, user, setUser, logout } = useAppContext();

    return (
        <>
            <PageCard className="w-11/12 h-full p-6 gap-4 rounded-lg">
                <div className="flex flex-row h-full w-full align-items">
                    <div className="basis-[60%]">
                        <img src={planPhoto} className="object-fit h-full" />
                    </div>
                    <div className="flex flex-col basis-[40%] h-full justify-center items-center gap-10">
                        <h1 className="text-2xl font-bold text-center">Sign in to get started</h1>

                        <div className="flex justify-center w-full">
                            {!user && <GoogleLoginButton />}
                            {user && <button onClick={logout}>Log Out</button>}
                        </div>
                    </div>
                </div>
            </PageCard>
        </>
    );
}