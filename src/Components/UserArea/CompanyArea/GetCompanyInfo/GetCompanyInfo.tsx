import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getCompanyInfoApi } from "../../../../WebApi/CompanyApi";
import ClientType from "../../../../Models/ClientType";
import CompanyUserModel from "../../../../Models/CompanyUserModel";
import store from "../../../../Redux/Store";
import notificationService from "../../../../Services/NotificationService";
import { addedCompanyAction } from "../../../../Redux/CompanyAppState";
import CompanyInfoCard from "../../../SharedArea/Cards/CompanyInfoCard/CompanyInfoCard";

export default function GetCompany() {
    const requiredType = ClientType.COMPANY;
    const navigate = useNavigate();
    const params = useParams();
    const companyId = +(params.id);

    const [company, setCompany] = useState<CompanyUserModel>(
        store
            .getState()
            .companyReducer.companies.find((company) => company.id === companyId)
    );

    const getCompanyFromServer = async () => {
        await getCompanyInfoApi()
            .then((res) => {
                notificationService.success("Got company successfully");
                setCompany(res.data);
            })

            .catch((error) => {
                notificationService.error(error);
                navigate("/home");
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
                    <CompanyInfoCard company={company} isSelf={true} />
                    :
                    <span>oops, there's a problem getting your information</span>
            }

        </>
    );
}

