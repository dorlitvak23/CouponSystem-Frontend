import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
// import Logo from "../../SharedArea/Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header-flex-around">
			<h1 className="headerH1">Coupons website</h1>
            <AuthMenu/>
        </div>
    );
}

export default Header;
