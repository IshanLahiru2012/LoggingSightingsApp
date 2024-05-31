import {useDeleteSighting, useGetSightings} from "../api/SightingApi.tsx";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {useState} from "react";
import {SightingInfo} from "../components/SightingInfo.tsx";

export const SightingListPage = () => {
    const {sightings} = useGetSightings();
    const {deleteSighting } = useDeleteSighting();

    const [selectedSightingId, setSelectedSightingId] = useState<string|null>(null);
    const handleshow = (id :string) => {
        setSelectedSightingId(selectedSightingId === id ? null : id);
    }
    const handleDelete = (id: string)=>{
        deleteSighting(id);
    }

    const labelStyle = { display: 'inline-block', minWidth: '120px', fontWeight: 'bold' };
    const valueStyle = { display: 'inline-block', flexGrow:1};
    console.log(sightings)


    return (
        <>
            <Typography variant={"h5"} fontWeight={"bold"} p={2} color={"blue"}>Logging Sightings</Typography>
            <Grid container rowSpacing={2} columnSpacing={2}>
                {sightings?.map((sighting)=>(
                    <Grid item xs={12} >
                        <Paper key={sighting.id} sx={{p:2}} >
                            <Box >
                                <Grid container justifyContent={"space-between"} pb={1}>
                                    <Grid item sx={{cursor:'pointer', '&:hover':{color:'blue' }}} onClick={ ()=> handleshow(sighting.id)}>
                                        <Typography component="span" style={labelStyle}>Name </Typography>
                                        <Typography component="span" style={valueStyle}>: {sighting.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant={'contained'} color={'warning'} onClick={()=> handleDelete(sighting.id)}>
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            {selectedSightingId === sighting.id && <SightingInfo sighting={sighting}/> }

                        </Paper>
                    </Grid>
                ))}
            </Grid>


        </>
    );
};