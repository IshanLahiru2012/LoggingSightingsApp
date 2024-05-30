import {Route, Routes} from "react-router-dom";
import {Layout} from "./layouts/Layout.tsx";
import HomePage from "./page/HomePage.tsx";
import {SigthingDetails} from "./forms/SigthingDetails.tsx";


export const  AppRoutes = () =>{
    return (
        <>
            <Routes>
                <Route path={'/'}
                       element={<Layout showFront={true}>
                                    <HomePage/>
                                </Layout>}
                />
                <Route path={'/sighting-details'}
                       element={<Layout showFront={true}>
                           <SigthingDetails/>
                       </Layout>}
                />
            </Routes>
        </>
    );
}

