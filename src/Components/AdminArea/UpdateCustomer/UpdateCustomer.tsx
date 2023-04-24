import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { addCustomerApi, getCustomerApi, updateCustomerApi } from "../../../WebApi/AdminApi";
import ClientType from "../../../Models/ClientType";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import { addCustomerAction, updateCustomerAction } from "../../../Redux/CustomerAppState";

function UpdateCustomer() {
  const requiredType = ClientType.ADMIN;
  const navigate = useNavigate();
  const params = useParams();
  const customerId = +(params.id || "");
  const [inTimeout, setInTimeout] = useState(false);

  const [customer, setCustomer] = useState(
    store
      .getState()
      .customerReducer.customers.find((customer) => customer.id === customerId)
  );

  const getOriginalCustomerFromServer = async () => {
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
      getOriginalCustomerFromServer(); 
    }
  })();

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
        "just enter a real email, we don't really know how this works. thanks."
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        "must contain at least one uppercase letter, one lowercase letter, and one digit (0-9), 8-20 characters long, thank you! :)"
      ),
  });

  const {
    register, handleSubmit, control, formState: { errors, isDirty, isValid }, } =
    useForm<CustomerUserModel>({
      defaultValues: { ...customer },
      mode: "all",
      resolver: yupResolver(schema),
    });

  const { dirtyFields } = useFormState({ control });

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

  const updateCustomer = async (customer: CustomerUserModel) => {
    if (inTimeout) { return; }
    setInTimeout(true);
    console.log(customer)
    
    await updateCustomerApi(customer)
      .then((res) => {
        notificationService.success("Customer updated successfully");
        store.dispatch(updateCustomerAction(res.data));
        navigate("/admin/customers");
      })
      .catch((error) => {
        notificationService.error(error);
      });
    setTimeout(() => setInTimeout(false), 3000);
  };

  return (
    <>
      {customer && (
        <div>
          <h1>Edit {customer.firstName + " " + customer.lastName}</h1>

          <form
            onSubmit={handleSubmit(updateCustomer)}
            className="add_customer_form flex-center-col"
          >
            <label htmlFor="id">id number</label>
            <input
              disabled={true}
              type="number"
              name="id"
              id="id"
              value={customer.id}
              {...register("id")}
            />
            <br />

            <label htmlFor="firstName">First Name</label>
            <input
              {...register("firstName")}
              type="firstName"
              placeholder="firstName"
              defaultValue={customer.firstName}
              id="firstName"
            />
            <span className="validation_rules">
              {errors.firstName?.message}
            </span>
            <br />

            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName")} type="lastName" placeholder="last name"
              defaultValue={customer.lastName} id="lastName" />
            <span className="validation_rules">{errors.lastName?.message}</span>
            <br />

            <label htmlFor="email">Email</label>
            <input
              {...register("email")} type="email" placeholder="email" defaultValue={customer.email} id="email"
            />
            <span className="validation_rules">{errors.email?.message}</span>
            <br />

            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              defaultValue={customer.email}
              id="password"
            />
            <span className="validation_rules">{errors.password?.message}</span>
            <br />

            <button className="button-success" disabled={!isDirty}>
              Apply Changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateCustomer;
