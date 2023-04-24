import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import { removeCustomerApi } from '../../../WebApi/AdminApi';
import ClientType from '../../../Models/ClientType';
import CustomerUserModel from '../../../Models/CustomerUserModel';
import store from '../../../Redux/Store';
import notificationService from '../../../Services/NotificationService';
import { deleteCustomerAction } from '../../../Redux/CustomerAppState';

function RemoveCustomer() {
    const requiredType = ClientType.ADMIN;
    const navigate = useNavigate();
    const params = useParams();
    const customerId= +(params.id || "");
    
    useEffect(()=>{ // test action is legal
        if (!store.getState().authReducer.token){
            notificationService.error("Unauthorized action");
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notificationService.error("Unauthorized action");
            navigate("/login");
        }
    },[])
    
    const removeCustomer = async ()=> {
        await removeCustomerApi(customerId).then((any)=>{
            notificationService.success("Customer deleted successfully");
            store.dispatch(deleteCustomerAction(customerId));
        })
        .catch ((error)=>{
            notificationService.error(error)
        })
        navigate("/admin/customers"); 
    }

    const cancelRemoveCustomer = ()=> {
        navigate("/admin/customers");
    }
    
    return (
        <div>
            <h2>Delete Customer From Database</h2>
            <span>are you sure?</span>
            <button className="button-success" onClick={removeCustomer}>Delete Now</button>
            <button className="button-cancel" onClick={cancelRemoveCustomer}>Return</button>
        </div>
    );
}

export default RemoveCustomer;