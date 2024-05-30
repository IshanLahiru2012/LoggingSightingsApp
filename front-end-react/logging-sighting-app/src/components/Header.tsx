import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {MenuComponent} from "./Menu.tsx";
import {LoginButton} from "./LoginButton.tsx";


export const Header = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <MenuComponent />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Logging Sightings
                        </Typography>
                        <LoginButton/>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
};