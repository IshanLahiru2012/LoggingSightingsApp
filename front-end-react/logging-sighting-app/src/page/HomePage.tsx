import { Box, Typography, Grid } from '@mui/material';
import SearchBar, {SearchFrom} from "../components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";
import {useSearchSightings} from "../api/SightingApi.tsx";
import {useEffect, useState} from "react";

const HomePage = () => {
    const [searchquery, setSearchquery] = useState('');

    const navigate = useNavigate();
    const {searchResult,isLoading,isSuccess} = useSearchSightings(searchquery);
    const handleSearchSubmit = (searchFormValues:SearchFrom)=>{
        setSearchquery(searchFormValues.searchQuery);
    }
    useEffect(()=>{
        if(isSuccess){
            navigate("/sightings", {state:{sighting : searchResult}})
        }
    },[isLoading,navigate, searchResult,isSuccess])
    return (
        <Box display="flex" flexDirection="column" gap={3} px={1}  >
            <Grid container display="flex" flexDirection="column"  gap={2} bgcolor="white"  borderRadius={2}
                boxShadow={3} py={4} mt={-8} textAlign="center"  >
                <Grid item xs={12}>
                    <Typography variant="h3" fontWeight="bold" color="emerald" gutterBottom>
                        Find Your Logging Sighting
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <SearchBar onSubmit={handleSearchSubmit}  />
                </Grid>

            </Grid>
            <Grid container spacing={2} px={1}>

            </Grid>
        </Box>
    );
};

export default HomePage;
