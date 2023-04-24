
// import { Outlet } from "react-router-dom";
// import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import Routing from "../../SharedArea/Routing/Routing";
import "./Layout.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header >
                <div className="HeaderContainer">
            <Header/>
            <Menu />
                </div>
            </header>
            <div className="BodyContainer">
            <Routing /> 
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
