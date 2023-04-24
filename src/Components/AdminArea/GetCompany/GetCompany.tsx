import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addCompanyApi, getCompanyApi } from "../../../WebApi/AdminApi";
import ClientType from "../../../Models/ClientType";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";
import CompanyCard from "../../SharedArea/Cards/CompanyCard/CompanyCard";
import CompanyInfoCard from "../../SharedArea/Cards/CompanyInfoCard/CompanyInfoCard";

export function GetCompany() {
  const requiredType = ClientType.ADMIN; 
  const navigate = useNavigate();
  const params = useParams();
  const companyId = +(params.id);
  
  const [company, setCompany] = useState<CompanyUserModel>(
    store
      .getState()
      .companyReducer.companies.find((company) => company.id === companyId)
  );

  const getCompanyFromServer = async () => {
    await getCompanyApi(companyId)
    .then((res) => {
        notificationService.success("Got company successfully");
        setCompany(res.data);
      })

      .catch((error) => {
        notificationService.error(error);
        navigate("/admin/companies"); 
        
      });
  };
  (function () {
    if (company === undefined) {
      getCompanyFromServer();
    }
  })();

  useEffect(() => {
    console.log(companyId);
    if (!store.getState().authReducer.token) {
      notificationService.error("No token available");
      navigate("/login");
    }
    if (!(store.getState().authReducer.user.clientType === requiredType)) {
      notificationService.error("Unauthorized action");
      navigate("/login");
    }
    
  }, []);
  

  return (
    <>
       {
        company ? 
        <CompanyInfoCard company={company} isSelf={false}  />
         : 
         <span>oops, there's a problem getting your information</span>
      }
      
    </>
  );
}

export default GetCompany;