import { AppBar, Toolbar, IconButton, Typography, Button, MenuItem, Box } from "@mui/material";

export default function NavBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuItem>Item1</MenuItem>
            <MenuItem>Item2</MenuItem>
            <MenuItem>Item3</MenuItem>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        </Box>

    )
}