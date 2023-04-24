import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./AuthMenu.css";
import { removedCompaniesAction, removedCouponsAction } from "../../../Redux/CompanyAppState";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>(store.getState().authReducer.user);

    useEffect(() => {

        setUser(store.getState().authReducer.user);

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authReducer.user);
        });

        return unsubscribe;
    }, []);

    function logout(): void {
        authService.logout();
        store.dispatch(removedCouponsAction());
        store.dispatch(removedCompaniesAction());
        notificationService.success("Bye Bye...");
    }
    return (
        <div className="AuthMenu">
            {!user &&
                <>
                    <span>Hello Guest |</span>
                    <NavLink to="/login">Login</NavLink>
                </>
            }
            {user &&
                <>
                    <span>Hello {user.email} | </span>
                    <NavLink to="/home" onClick={logout}>Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
