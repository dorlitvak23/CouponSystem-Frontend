import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import * as yup from "yup";
import store from '../../../Redux/Store';
import { BsPencilSquare } from 'react-icons/bs';
import ClientType from '../../../Models/ClientType';
import CompanyUserModel from '../../../Models/CompanyUserModel';
import { getAllCompaniesApi } from '../../../WebApi/AdminApi';
import notificationService from '../../../Services/NotificationService';
import { NavLink } from 'react-router-dom';
import CompanyCard from '../../SharedArea/Cards/CompanyCard/CompanyCard';
import { gotCompaniesAction } from '../../../Redux/CompanyAppState';

export function CompanyList() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<CompanyUserModel[]>(store.getState().companyReducer.companies);

    useEffect(() => {
        if (companies.length <= 1) { 
            companyList();
        }
    },[])
    
    const companyList = async ()=> {
        await getAllCompaniesApi().then((res)=>{
            notificationService.success("Got all companies successfully");
            console.log(res.data)
            console.log(typeof res.data)

            store.dispatch(gotCompaniesAction(res.data));
            setCompanies(res.data);
        })
        .catch ((error)=>{
            notificationService.error(error);
        })
    }
    

    return (
        <div className="companies_view_container">
            <h1>All Companies</h1>
            <NavLink to="/companies/add">
                <BsPencilSquare size={25}/>Add Company
            </NavLink>
            <span> | </span>
            <NavLink to="/home">
              Back
            </NavLink>
            <div className="company_list_container">
                {
                    companies.length > 0 ?
                    (<div className="companies_gallery">
                        {companies.map((company)=>(
                        <CompanyCard key={company.id} isSelf={false} company={company} />
                        ))}
                    </div>) : 
                    (<div className="empty_view">
                        <p>no companies available</p>
                    </div>)
                }
            </div>
        </div>
    )}

