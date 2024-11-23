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
        <div className="flex ml-auto gap-3 h-full">
          <Btn onClick={onHome}>Home</Btn>

          {!user && <Btn onClick={onLogin}>Login</Btn>}
          {user && <Btn onClick={logout}>Log Out</Btn>}
        </div>
      </div>
      </>
        // <Box>
        // <AppBar position="static">
        //   <Toolbar>
        //     <MenuItem>Item1</MenuItem>
        //     <MenuItem>Item2</MenuItem>
        //     <MenuItem>Item3</MenuItem>
        //     <Typography variant="h6" component="div">
        //       News
        //     </Typography>
          
        //       <div>
        //         {!user && <button onClick={onLogin} className="text-white">Login</button>}
        //         {user && <button onClick={logout} className="text-white">Log Out</button>}
        //       </div>
        //   </Toolbar>
        // </AppBar>
        // </Box>

    )
}