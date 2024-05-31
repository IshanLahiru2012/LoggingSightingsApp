import {Fade, IconButton, Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {useNavigate} from "react-router-dom";



export const MenuComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const handlecreateSighting = ()=> {
        navigate("/manage-transfer");
        handleClose();
    }
    const handleListingSightins = ()=> {
        navigate("/sightings");
        handleClose();
    }
    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {/*<MenuItem onClick={handleProfile}>Profile</MenuItem>*/}
                {/*<MenuItem onClick={handleStatus}>Booking Status</MenuItem>*/}
                <MenuItem onClick={handlecreateSighting}>Logging Sighting</MenuItem>
                <MenuItem onClick={handleListingSightins}>Sighting List</MenuItem>
            </Menu>
        </>
    );
};