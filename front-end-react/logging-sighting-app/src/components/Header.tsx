import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {MenuComponent} from "./Menu.tsx";
import {LoginButton} from "./LoginButton.tsx";
import {useNavigate} from "react-router-dom";


export const Header = () => {

    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <MenuComponent />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor:'pointer' }} onClick={()=> navigate("/")}>
                            Logging Sightings
                        </Typography>
                        <LoginButton/>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
};