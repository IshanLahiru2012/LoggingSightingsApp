import front from '../assets/main.jpg'
import {Box} from "@mui/material";
const FrontView = ()=>{
    return(
            <Box width="100%" maxHeight="500px">
                <img src={front} alt="Front Image" style={{ width: '100%', height: 'auto', maxHeight: '500px' }} />
            </Box>
    )
}

export default FrontView;

