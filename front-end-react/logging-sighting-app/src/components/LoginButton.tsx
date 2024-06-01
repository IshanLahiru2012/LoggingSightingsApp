import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const LoginButton = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ||"") : null;
    const navigate = useNavigate();
    return (
        <>
            {!!user && user.id >0 ?
                <Button color="inherit" onClick={()=> {
                    localStorage.setItem("user", "");
                    window.location.reload();
                    navigate("/")
                }}>Logout {user.name}</Button> :
                <Button color="inherit" onClick={()=> navigate("/login")}>Login</Button>
            }
        </>
    );
};