import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addCustomerApi, getCustomerApi } from "../../../../WebApi/AdminApi";
import ClientType from "../../../../Models/ClientType";
import CustomerUserModel from "../../../../Models/CustomerUserModel";
import store from "../../../../Redux/Store";
import notificationService from "../../../../Services/NotificationService";
import { addCustomerAction } from "../../../../Redux/CustomerAppState";
import CustomerInfoCard from "../../../SharedArea/Cards/CustomerInfoCard/CustomerInfoCard";
import { getCustomerInfoApi } from "../../../../WebApi/CustomerApi";

export default function GetCustomerInfo() {
  const requiredType = ClientType.CUSTOMER;
  const navigate = useNavigate();
  const customerId = JSON.parse(localStorage.getItem('user')).id;

  const [customer, setCustomer] = useState<CustomerUserModel>(
    store
      .getState()
      .customerReducer.customers.find((customer) => customer.id === customerId) 
  );
  const getCustomerFromServer = async () => {
    await getCustomerInfoApi()
    .then((res) => {
        notificationService.success("Got customer successfully");
        store.dispatch(addCustomerAction(res.data));
        setCustomer(res.data);
      })

      .catch((error) => {
        notificationService.error(error);
        navigate("/customers");
      });
  };
  (function () {
    if (customer === undefined) {
      getCustomerFromServer();
    }
  })();

  useEffect(() => {
    if (!store.getState().authReducer.token) {
      notificationService.error("No token valid");
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
      customer ? 
      <CustomerInfoCard customer={customer} isSelf={true}  />
       : 
       <span>oops, there's a problem getting your information</span>
    }
      
    </>
  );
}