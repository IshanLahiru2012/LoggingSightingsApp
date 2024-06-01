import {Route, Routes} from "react-router-dom";
import {Layout} from "./layouts/Layout.tsx";
import HomePage from "./page/HomePage.tsx";
import {SigthingDetails} from "./forms/SigthingDetails.tsx";
import {UserDetails} from "./forms/UserDetails.tsx";
import {SightingListPage} from "./page/SightingListPage.tsx";


export const  AppRoutes = () =>{
    return (
        <>
            <Routes>
                <Route path={'/'}
                       element={<Layout showFront={true}>
                                    <HomePage/>
                                </Layout>}
                />
                <Route path={'/manage-sighting'}
                       element={<Layout showFront={true}>
                           <SigthingDetails/>
                       </Layout>}
                />
                <Route path={'/login'}
                       element={<Layout showFront={true}>
                           <UserDetails/>
                       </Layout>}
                />
                <Route path={'/sightings'}
                       element={<Layout >
                           <SightingListPage/>
                       </Layout>}
                />


            </Routes>
        </>
    );
}

