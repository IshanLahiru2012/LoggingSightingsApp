import {Box, Container, Typography} from "@mui/material";

export const Footer = () => {
    return (
        <>
            <Box component="footer" sx={{ py: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
                <Container maxWidth="lg">
                    <Typography variant="body1" align="center">
                        Footer
                    </Typography>
                </Container>
            </Box>
        </>
    );
};