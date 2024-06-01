import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {Sighting} from "../type.ts";
import {blue} from "@mui/material/colors";
import { useNavigate} from "react-router-dom";

type Props ={
    sighting : Sighting;
}
export const SightingInfo = ({sighting}:Props) => {

    const navigate = useNavigate();

    const getCorrectedDate = (dateTime: string) => {
        return new Date(new Date(dateTime).getTime() - new Date(dateTime).getTimezoneOffset()*60*1000).toISOString();
    }

    const getDate = (dateTime :string):string=>{
        return getCorrectedDate(dateTime).split('T')[0] ;
    }
    const getTime = (dateTime : string):string=>{
        return getCorrectedDate(dateTime).split('T')[1].substring(0,5);
    }
    const labelStyle = { display: 'inline-block', minWidth: '120px', fontWeight: 'bold' };
    const valueStyle = { display: 'inline-block' };

    const handleNavigate = (sighting : Sighting)=>{
        navigate("/manage-sighting" ,{state:{sighting : sighting}});
    }

    return (
        <>
            <Paper sx={{p:2, bgcolor:blue[50]}}>
                <Grid container>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography component="span" style={labelStyle}>Short Name </Typography>
                            <Typography component="span" style={valueStyle}>: {sighting.shortName}</Typography>
                        </Box>
                        <Box>
                            <Typography component="span" style={labelStyle}>Airline Code </Typography>
                            <Typography component="span" style={valueStyle}>: {sighting.airlineCode}</Typography>
                        </Box>
                        <Box>
                            <Typography component="span" style={labelStyle}>Location </Typography>
                            <Typography component="span" style={valueStyle}>: {sighting.location}</Typography>
                        </Box>
                        <Box>
                            <Typography component="span" style={labelStyle}>Created Date </Typography>
                            <Typography component="span" style={valueStyle}>: {getDate(sighting.createdDate + '')}</Typography>
                        </Box>
                        <Box>
                            <Typography component="span" style={labelStyle}>Created Time </Typography>
                            <Typography component="span" style={valueStyle}>: {getTime(sighting.createdDate +'')}</Typography>
                        </Box>
                        <Box>
                            <Typography component="span" style={labelStyle}>Created user </Typography>
                            <Typography component="span" style={valueStyle}>: {sighting.createdUser?.name}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems:'flex-end'}} >
                            <Button variant={"contained"} color={"success"} onClick={()=> handleNavigate(sighting)}>Edit</Button>
                        </Box>
                    </Grid>

                </Grid>


            </Paper>

        </>
    );
};