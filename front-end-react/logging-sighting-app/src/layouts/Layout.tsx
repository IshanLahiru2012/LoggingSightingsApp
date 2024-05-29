import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";

type Props = {
    children: React.ReactNode,
}
export const Layout = ({children}:Props) => {
    return (
        <>
            <div className="mainPage">
                <Header/>
                {children}
                <Footer/>

            </div>


        </>
    );
};