import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { addCouponApi } from '../../../../WebApi/CompanyApi';
import ClientType from '../../../../Models/ClientType';
import { CouponModel } from '../../../../Models/CouponModel';
import store from '../../../../Redux/Store';
import notificationService from '../../../../Services/NotificationService';
import { addedCouponAction } from '../../../../Redux/CompanyAppState';
import { Category } from '../../../../Models/Category';
import { now } from 'moment';


function AddCoupon() {
    const requiredType = ClientType.COMPANY;
    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);

    const schema = yup.object().shape({
        title: yup.string().lowercase().required("title required"),
        category: yup.string().required("category required"),
        description: yup.string().lowercase().required("description required"),
        startDate: yup.date()
            .min(new Date(Date.now() - 86400_000), "start date in the past")
            .typeError("must specify a starting date")
            .required("must specify a starting date"),
        endDate: yup.date().
            min(
                yup.ref('startDate'),
                "end date can't be before start date"
            )
            .required("end date required")
            .nullable().default(() => new Date(Date.now() + 6.048e+8))
            .typeError("must specify an expiration date"),
        amount: yup.number().integer().min(1).required("amount required"),
        price: yup.number().min(0).required("price required"),
        img: yup.string(),
        companyId: yup.number()
    });



    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });

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

    const addCoupon = async (coupon: CouponModel) => {
        if (inTimeout) { return; }
        setInTimeout(true);
        await addCouponApi(coupon).then((res) => {
            notificationService.success("Coupon created successfully");
            store.dispatch(addedCouponAction(res.data));
            navigate("/company/coupons");
        })
            .catch((error) => {
                console.log(error);
                notificationService.error(error);
            })
        setTimeout(() => setInTimeout(false), 3000);
    }


    return (
        <div>
            <h1>Add New Coupon</h1>

            <form onSubmit={handleSubmit(addCoupon)} className="add_coupon_form flex-center-col">
                <input {...register("id")} hidden value={1} />
                <label htmlFor="name">title</label>
                <input {...register("title")} name="title" type="text" placeholder="coupon title" id="title" />
                <span className="validation_rules">{errors.title?.message}</span>
                <br />

                <label htmlFor="category">Category</label>
                <select name='category' {...register("category")} placeholder="category" defaultValue="" id="category">
                    <option value="" disabled>Category</option>
                    {Object.keys(Category).map((key, index) => (
                        <option
                            aria-selected="true"
                            key={key}
                            value={key}
                        >{Object.values(Category)[index]}
                        </option>
                    ))}
                </select>
                <span className="validation_rules">{errors.category?.message}</span>
                <br />

                <label htmlFor="description">Description</label>
                <input {...register("description")} type="text" placeholder="description" id="description" name='description' />
                <span className="validation_rules">{errors.description?.message}</span>
                <br />

                <label htmlFor="startDate">Beginning at</label>
                <input {...register("startDate")} type="date" id="startDate" name='startDate' />
                <span className="validation_rules">{errors.startDate?.message}</span>
                <br />

                <label htmlFor="endDate">Ending at</label>
                <input {...register("endDate")} type="date" id="endDate" name='endDate' />
                <span className="validation_rules">{errors.endDate?.message}</span>
                <br />


                <label htmlFor="amount">Coupon Amount</label>
                <input {...register("amount")} type="number" min={1} placeholder="amount" id="amount" name='amount' />
                <span className="validation_rules">{errors.amount?.message}</span>
                <br />

                <label htmlFor="price">Coupon Price</label>
                <input {...register("price")} type="number" min={0} step={0.01} pattern="^\d+(?:\.\d{1,2})?$" placeholder="price" id="price" name='price' />
                <span className="validation_rules">{errors.price?.message}</span>
                <br />

                <label htmlFor="image">Image</label>
                <input {...register("image")} type="text" placeholder="image" id="image" name='image' />
                <span className="validation_rules">{errors.image?.message}</span>
                <br />

                <button className="button-success" disabled={!isValid}>Create Now</button>
            </form>
        </div>
    );
}

export default AddCoupon;