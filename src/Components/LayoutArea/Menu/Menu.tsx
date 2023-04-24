import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {

    const [clientType, setClientType] = useState<ClientType>(store.getState().authReducer?.user?.clientType);

    useEffect(() => {

        setClientType(store.getState().authReducer?.user?.clientType);

        const unsubscribe = store.subscribe(() => {
            setClientType(store.getState().authReducer?.user?.clientType);
        });

        return unsubscribe;

    }, []);

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>
            <span> | </span>
            <NavLink to="/about">About</NavLink>
            <span> | </span>

            {clientType === ClientType.CUSTOMER && <>
                <NavLink to="/customer/coupons">Buy Coupons</NavLink>
                <span> | </span>
                <NavLink to="/customer/coupons/owned">My Coupons</NavLink>
                <span> | </span>
                <NavLink to="/customer/view">My Profile</NavLink>
            </>}
            {clientType === ClientType.COMPANY && <>
                <NavLink to="/company/coupons">All Coupons</NavLink>
                <span> | </span>
                <NavLink to="/company/view">My Company</NavLink>
            </>}
            {clientType === ClientType.ADMIN && <>
                <NavLink to="/admin/companies">Companies</NavLink>
                <span> | </span>
                <NavLink to="/admin/customers">Customers</NavLink>
            </>}
        </div>
    );
}

export default Menu;
