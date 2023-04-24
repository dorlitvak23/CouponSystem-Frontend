import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import { removeCompanyApi } from '../../../WebApi/AdminApi';
import ClientType from '../../../Models/ClientType';
import CompanyUserModel from '../../../Models/CompanyUserModel';
import store from '../../../Redux/Store';
import notificationService from '../../../Services/NotificationService';
import { deletedCompanyAction } from '../../../Redux/CompanyAppState';

export function RemoveCompany() {
    const requiredType = ClientType.ADMIN;
    const navigate = useNavigate();
    const params = useParams();
    const companyId= +(params.id || "");
    
    useEffect(()=>{ // test action is legal
        if (!store.getState().authReducer.token){
            notificationService.error("No token");
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notificationService.error("Unauthorized action");
            navigate("/login");
        }
    },[])
    
    const removeCompany = async ()=> {
        await removeCompanyApi(companyId).then((any)=>{
            notificationService.success("Company deleted successfully");
            store.dispatch(deletedCompanyAction(companyId));
        })
        .catch ((error)=>{
            notificationService.error(error)
        })
        navigate("/admin/companies");
    }

    const cancelRemoveCompany = ()=> {
        navigate("/admin/companies");
    }
    
    return (
        <div>
            <h2>Delete Company From Database</h2>
            <span>are you sure?</span>
            <button className="button-success" onClick={removeCompany}>Delete Now</button>
            <button className="button-cancel" onClick={cancelRemoveCompany}>Return</button>
        </div>
    );
}

export default RemoveCompany;