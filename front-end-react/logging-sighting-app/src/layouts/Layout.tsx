import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
import FrontView from "../components/FrontView.tsx";
import {Box, Container, CssBaseline} from "@mui/material";

type Props = {
    children: React.ReactNode,
    showFront?:boolean;
}
export const Layout = ({children, showFront= false}:Props) => {
    return (
        <>
            {/*<div className="flex flex-col min-h-screen ">*/}
            {/*    <Header/>*/}
            {/*    {showFront && <FrontView/>}*/}
            {/*    <div className="container mx-auto flex-1 py-10">{children}</div>*/}
            {/*    <Footer/>*/}

            {/*</div>*/}

            <Box display="flex" flexDirection="column" minHeight="100vh">
                <CssBaseline />
                <Header />
                {showFront && <FrontView/>}
                <Box component="main" flexGrow={1} py={4}>
                    <Container >
                        {children}
                    </Container>
                </Box>
                <Footer />
            </Box>

        </>
    );
};