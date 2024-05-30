import { Box, Typography, Grid } from '@mui/material';
// import SearchBar from './SearchBar'; // Import your custom SearchBar component

const HomePage = () => {
    return (
        <Box display="flex" flexDirection="column" gap={3} px={1}>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                bgcolor="white"
                borderRadius={2}
                boxShadow={3}
                py={4}
                mt={-8}
                textAlign="center"
            >
                <Typography variant="h3" fontWeight="bold" color="emerald" gutterBottom>
                    Find Your Tour Sighting
                </Typography>
                {/*<SearchBar onSubmit={handleSearchSubmit} placeHolder="Search by City or Town" />*/}
            </Box>
            <Grid container spacing={2} px={1}>
                {/*<Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="center" textAlign="center">*/}
                {/*    <Typography variant="h3" fontWeight="bold" gutterBottom>*/}
                {/*        just a tap - book your perfect ride*/}
                {/*    </Typography>*/}
                {/*    <Typography>*/}
                {/*        Unlock your journey with ease - reserve your ride in seconds with our intuitive tour booking app!*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
            </Grid>
        </Box>
    );
};

export default HomePage;
