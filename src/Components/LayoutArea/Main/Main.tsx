import { Outlet } from "react-router-dom";
import Routing from "../../SharedArea/Routing/Routing";
import "./Main.css";

function Main(): JSX.Element {
    return (
        <div className="Main">

            <Routing/>
            <Outlet/>
        
        </div>
    );
}

export default Main;