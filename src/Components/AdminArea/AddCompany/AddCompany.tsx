import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import ClientType from "../../../Models/ClientType";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import store from '../../../Redux/Store';
import notificationService from '../../../Services/NotificationService';
import { addCompanyApi } from '../../../WebApi/AdminApi';
import { addedCompanyAction } from '../../../Redux/CompanyAppState';




 export function AddCompany() {
    const requiredType = ClientType.ADMIN;
    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);

    const schema = yup.object().shape({  
        name: 
            yup.string().lowercase().required("company name is required"),
        email: 
            yup.string().lowercase()
                .required("please enter the company's email address")
                .matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "just enter a real email, we don't really know how this works. thanks."),
        password: 
            yup.string()
                .required("Password is required")
                .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, "must contain at least one uppercase letter, one lowercase letter, and one digit (0-9), 8-20 characters long, thank you! :)")
    })
    
    

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = 
    useForm<CompanyUserModel>({ mode: "all", resolver: yupResolver(schema) });

    useEffect(()=>{
        if (!store.getState().authReducer.token){
            notificationService.error("No token");
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notificationService.error("Unauthorized action");
            navigate("/login");
        }
    },[])
    
    const addCompany = async (company: CompanyUserModel)=> {
        if (inTimeout) {return;}
        setInTimeout(true);
        await addCompanyApi(company).then((res)=>{
            notificationService.success("Company created successfully");
            store.dispatch(addedCompanyAction(res.data));
            navigate("/admin/companies");
        })
        .catch ((error)=>{
            notificationService.error(error);
        })
        setTimeout(() => setInTimeout(false), 3000);         
    }
    

    return (
        <div>
            <h1>Add New Company</h1>

            <form onSubmit={handleSubmit(addCompany)} className="add-company-form flex-center-col">
                <label htmlFor="name">Name</label>
                <input {...register("name")} type="name" placeholder= "Israel" id="name" />
                <span className="validation_rules">{errors.name?.message}</span>
                <br />

                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" placeholder="email@example.JB" id="email" />
                <span className="validation_rules">{errors.email?.message}</span>
                <br />

                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password" />
                <span className="validation_rules">{errors.password?.message}</span>
                <br />

                <button className="button-success" disabled={!isValid}>Create Now</button>
            </form>
        </div>
    );
}



export default AddCompany;