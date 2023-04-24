import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import * as yup from "yup";
import { getAllCustomersApi, removeCustomerApi } from '../../../WebApi/AdminApi';
import ClientType from '../../../Models/ClientType';
import CustomerUserModel from '../../../Models/CustomerUserModel';
import store from '../../../Redux/Store';
import notificationService from '../../../Services/NotificationService';
import { getCustomersAction } from '../../../Redux/CustomerAppState';
import CustomLink from '../../SharedArea/CustomLink/CustomLink';
import { BsPencilSquare } from 'react-icons/bs';
import EmptyView from '../../SharedArea/EmptyView/EmptyView';
import CustomerCard from '../../SharedArea/Cards/CustomerCard/CustomerCard';
import { NavLink } from 'react-router-dom';

function GetAllCustomers() {
    const requiredType = ClientType.ADMIN;
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<CustomerUserModel[]>(store.getState().customerReducer.customers);
    
    useEffect(()=>{
        if (!store.getState().authReducer.token){
            notificationService.error("No token available");
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notificationService.error("Unauthorized action");
            navigate("/login");
        }
    },[]) 

    useEffect(() => {
            getAllCustomers();
    },[])
    
    const getAllCustomers = async ()=> {
        await getAllCustomersApi().then((res)=>{
            notificationService.success("Got all customers successfully");
            store.dispatch(getCustomersAction(res.data));
            console.log(res.data)
            console.log(typeof res.data)
            setCustomers(res.data);
        })
        .catch ((error)=>{
            notificationService.error(error);
        })
    }
    

    return (
        <div className="customers_view_container">
            <h1>All Customers</h1>
            <NavLink to="/customers/add">
                <BsPencilSquare size={25}/>Add Customer
            </NavLink>
            <span> | </span>
            <NavLink to="/home">
              Back
            </NavLink>
            <div className="customer_list_container">
                {
                    customers.length > 0 ?
                    (<div className="customers_gallery">
                        {customers.map((customer)=>(
                        <CustomerCard key={customer.id} customer={customer} isSelf={false} />
                        ))}
                    </div>) : 
                    (<div className="empty_view">
                       <p>No customers available</p>
                    </div>)
                }
            </div>
        </div>
    )}

export default GetAllCustomers;