import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
import FrontView from "../components/FrontView.tsx";
import {Box, Container, CssBaseline, Grid} from "@mui/material";

type Props = {
    children: React.ReactNode,
    showFront?:boolean;
}
export const Layout = ({children, showFront= false}:Props) => {
    return (
        <>
            {/*<Grid minHeight="100vh">*/}
            {/*/!*<Box display="flex" flexDirection="column" minHeight="100vh">*!/*/}
            {/*    /!*<CssBaseline />*!/*/}
            {/*    <Header />*/}
            {/*    {showFront && <FrontView/>}*/}
            {/*    <Box component="main" flexGrow={1} py={4}>*/}
            {/*        {children}*/}
            {/*    </Box>*/}
            {/*    <Footer />*/}
            {/*</Grid>*/}
            <Grid container direction="column" style={{ minHeight: '100vh' }}>
                <CssBaseline />
                <Grid item>
                    <Header />
                </Grid>
                {showFront && (
                    <Grid item>
                        <FrontView />
                    </Grid>
                )}
                <Grid item xs>
                    <Container style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        {children}
                    </Container>
                </Grid>
                <Grid item>
                    <Footer />
                </Grid>
            </Grid>

        </>
    );
};