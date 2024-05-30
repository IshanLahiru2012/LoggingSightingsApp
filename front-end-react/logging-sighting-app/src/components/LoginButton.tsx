import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const LoginButton = () => {
    const user = localStorage.getItem("user")
    const navigate = useNavigate();
    return (
        <>
            {user && user.length >0 ?
                <Button color="inherit" onClick={()=> localStorage.setItem("user", "")}>Logout</Button> :
                <Button color="inherit" onClick={()=> navigate("/login")}>Login</Button>
            }
        </>
    );
};