import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import { yupResolver } from "@hookform/resolvers/yup";
import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import { addCustomerAction } from "../../../Redux/CustomerAppState";
import { addCustomerApi } from "../../../WebApi/AdminApi";
import "./AddCustomer.css";
import { log } from "console";

function AddCustomer(): JSX.Element {
    const requiredType = ClientType.ADMIN;
    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .lowercase()
            .required("customer name is required, please enter first name"),
        lastName: yup.string().lowercase().required("please enter last name"),
        email: yup
            .string()
            .lowercase()
            .required("please enter the customer's email address")
            .matches(
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                "just enter a real email, we don't really know how this copy-pasted-from-StackOverFlow-regex works. thanks."
            ),
        password: yup
            .string()
            .required("Password is required")
            .matches(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                "must contain at least one uppercase letter, one lowercase letter, and one digit (0-9), 8-20 characters long, thank you! :)"
            ),
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CustomerUserModel>({ mode: "all", resolver: yupResolver(schema) });

    useEffect(() => {
        if (!store.getState().authReducer.token) {
            notificationService.error("No token available");
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)) {
            notificationService.error("Unauthorized action");
            navigate("/login");
        }
    }, [])


    const addCustomer = async (customer: CustomerUserModel) => {
        if (inTimeout) {return;}
        setInTimeout(true);
        try {
            const { data } = await addCustomerApi(customer);
            notificationService.success("Customer created successfully");
            console.log("res.data " + data.id);
            store.dispatch(addCustomerAction(data));
            navigate("/admin/customers");
          } catch (error) {
            notificationService.error(error);
          }
        
        // await addCustomerApi(customer).then((res) => {
        //     notificationService.success("Customer created successfully");
        //     console.log("res.data " + res)
        //     store.dispatch(addCustomerAction(res));
        //     navigate("/admin/customers");
        // })
        //     .catch((error) => {
        //         notificationService.error(error);
        //     })
        setTimeout(() => setInTimeout(false), 3000);
    }

        return (
            <div className="AddCustomer">
                                <h1>Add New Customer</h1>

                <form onSubmit={handleSubmit(addCustomer)} className="add-customer-form flex-center-col">
                    <label htmlFor="firstName">First Name</label>
                    <input {...register("firstName",)} type="firstName" placeholder="Israel" id="firstName" />
                    <span className="validation_rules">{errors.firstName?.message}</span>
                    <br />

                    <label htmlFor="lastName">Last Name</label>
                    <input {...register("lastName",)} type="lastName" placeholder="Israeli" id="lastName" />
                    <span className="validation_rules">{errors.lastName?.message}</span>
                    <br />

                    <label htmlFor="email">Email</label>
                    <input {...register("email")} type="email" placeholder="email@example.com" id="email" />
                    <span className="validation_rules">{errors.email?.message}</span>
                    <br />

                    <label htmlFor="password">Password</label>
                    <input  {...register("password")} type="password" placeholder="password" id="password" />
                    <span className="validation_rules">{errors.password?.message}</span>
                    <br />

                    <button className="button-success" disabled={!isValid}>Create Now</button>
                </form>

            </div>
        )
    }


    export default AddCustomer;
