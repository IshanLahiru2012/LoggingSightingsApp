import {Route, Routes} from "react-router-dom";
import {Layout} from "./layouts/Layout.tsx";
import {HomePage} from "./page/HomePage.tsx";


export const  AppRoutes = () =>{
    return (
        <>
            <Routes>
                <Route path={'/'}
                       element={<Layout >
                                    <HomePage/>
                                </Layout>}
                />
            {/*    <Route path={'/'}*/}
            {/*           element={<Layout>*/}
            {/*                        <HomePage/>*/}
            {/*                    </Layout>*/}
            {/*    }/>*/}

            </Routes>
        </>
    );
}

