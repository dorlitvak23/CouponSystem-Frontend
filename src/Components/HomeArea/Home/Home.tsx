import "./Home.css";
import home from "../../../Assests/home.png"

function Home(): JSX.Element {
    return (
        <div className="Home">
         <img className="homeImg" src={home}></img>
        </div>
    );
}

export default Home;
