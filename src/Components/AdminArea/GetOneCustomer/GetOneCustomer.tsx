import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addCustomerApi, getCustomerApi } from "../../../WebApi/AdminApi";
import ClientType from "../../../Models/ClientType";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import { addCustomerAction } from "../../../Redux/CustomerAppState";
import CustomerInfoCard from "../../SharedArea/Cards/CustomerInfoCard/CustomerInfoCard";

export default function GetCustomer() {
  const requiredType = ClientType.ADMIN; 
  const navigate = useNavigate();
  const params = useParams();
  const customerId = +(params.id );

  const [customer, setCustomer] = useState<CustomerUserModel>(
    store
      .getState()
      .customerReducer.customers.find((customer) => customer.id === customerId) 
  );
  const getCustomerFromServer = async () => {
    await getCustomerApi(customerId)
    .then((res) => {
        notificationService.success("Got customer successfully");
        store.dispatch(addCustomerAction(res.data));
        setCustomer(res.data);
      })

      .catch((error) => {
        notificationService.error(error);
        navigate("/admin/customers"); 
      });
  };
  (function () {
    if (customer === undefined) {
      getCustomerFromServer();
    }
  })();

  useEffect(() => {
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
      customer ? 
      <CustomerInfoCard customer={customer} isSelf={false}  />
       : 
       <span>oops, there's a problem getting your information</span>
    }
      
    </>
  );
}