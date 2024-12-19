import { AppBar, Toolbar, IconButton, Typography, Button, MenuItem, Box } from "@mui/material";
import { useAppContext } from '../AppProvider';
import GoogleLoginButton from './GoogleLoginButton'
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";

export default function NavBar() {
    const { token, setToken, user,  logout } = useAppContext();
    const navigate = useNavigate();

    const onLogin = () => {
      navigate('/login');
    }

    const onHome = () => {
      navigate('/home')
    }

    return (
      <>
      <div className="flex bg-sky-600 text-white h-14 items-center px-9 w-full">
        <div>
          <h1 className="font-bold text-2xl">Semester Plan</h1>
        </div>
        <div className="flex ml-auto gap-3 h-full">
          <Btn onClick={onHome}>Home</Btn>

          {!user && <Btn onClick={onLogin}>Login</Btn>}
          {user && <Btn onClick={logout}>Log Out</Btn>}
        </div>
      </div>
      </>

    )
}