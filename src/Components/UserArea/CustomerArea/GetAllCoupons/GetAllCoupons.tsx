import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import * as yup from "yup";
import ClientType from '../../../../Models/ClientType';
import { CouponModel } from '../../../../Models/CouponModel';
import store from '../../../../Redux/Store';
import notificationService from '../../../../Services/NotificationService';
import CustomLink from '../../../SharedArea/CustomLink/CustomLink';
import { BsPencilSquare } from 'react-icons/bs';
import EmptyView from '../../../SharedArea/EmptyView/EmptyView';
import CouponCard from '../../../SharedArea/Cards/CouponCard/CouponCard';
import { Category } from '../../../../Models/Category';
import { getAllCouponsApi, getAllCustomerCouponsApi } from '../../../../WebApi/CustomerApi';
import { getCouponsAction, getCustomerCouponsAction } from '../../../../Redux/CustomerAppState';
import "./GetAllCoupons.css"

function GetAllCoupons() {
    const requiredType = ClientType.CUSTOMER;
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);
    const [myCoupons, setMyCoupons] = useState<CouponModel[]>(store.getState().customerReducer.customerCoupons);
    const [category, setCategory] = useState<String>("ALL");
    const [maxPrice, setMaxPrice] = useState<number>(0);


    useEffect(()=>{
        if (!store.getState().authReducer.token){
            notificationService.error("No token available");
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notificationService.error("Unauthorized action");
            navigate("/login");
        }
    },[]) 

    useEffect(() => {
        if (coupons.length <= 0) {
            getAllCoupons();
        }
        if (myCoupons.length <= 0) {
            getAllCustomerCoupons();
        }
    },[])
    
    const getAllCoupons = async ()=> {
        await getAllCouponsApi().then((res)=>{
            notificationService.success("Got coupons successfully");
            store.dispatch(getCouponsAction(res.data));
            setCoupons(res.data);
        })
        .catch ((error)=>{
            notificationService.error(error);
        })
    }

    const getAllCustomerCoupons = async ()=> {
        await getAllCustomerCouponsApi().then((res)=>{
            notificationService.success("Got customer's coupons successfully");
            store.dispatch(getCustomerCouponsAction(res.data));
            setMyCoupons(res.data);
        })
        .catch ((error)=>{
            notificationService.error(error);
        })
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
        let filteredCoupons = store.getState().customerReducer.coupons;
        if (maxPrice !== 0) {
            filteredCoupons = 
            filteredCoupons.filter(
                (coupon) => { 
                    return coupon.price <= maxPrice 
                });}
        if (e.currentTarget.value !== "ALL") {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => { 
                        return coupon.category.valueOf() === e.currentTarget.value
                     });
        } 
        setCoupons(filteredCoupons);
    }

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.currentTarget.value));
        let filteredCoupons = store.getState().customerReducer.coupons;
        if (category !== "ALL") {
        filteredCoupons= 
            filteredCoupons.filter(
                (coupon) => { 
                    return coupon.category.valueOf() === category;
                });
            }
        if (Number(e.currentTarget.value) !== 0) {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => { 
                        return coupon.price <= Number(e.currentTarget.value);
                    });
        } 
        setCoupons(filteredCoupons);
    }
    

    return (
        <div className="coupons_view_container">
            <h1>All Coupons</h1>
            <NavLink to="/home">
              Back
            </NavLink>
            <label htmlFor="category"></label>
                <select name='category' placeholder="category" onChange={(e)=>handleCategoryChange(e)} defaultValue="ALL" id="category"> 
                <option key="ALL" value="ALL">All</option>
                {Object.keys(Category).map((key, index) => (
                <option
                aria-selected="true"
                key={key}
                value={key}
                >{Object.values(Category)[index]}
                </option>
                ))}
                </select>
                <br/>
                <label htmlFor="price">Coupon Price</label>
                <input type="number" min={0} max={999_999} step={1} defaultValue={0} onChange={(e)=>handleMaxPriceChange(e)} id="price" name='price'/>
            <div className="coupon_list_container">
                {
                    coupons.length > 0 ?
                    (<div className="coupons_gallery">
                        {coupons.map((coupon, index)=>(
                         <CouponCard key={index} purchasable={true} owned={false} coupon={coupon} />
                        ))}
                    </div>) : 
                    (<div className="empty_view">
                        <EmptyView msg="no coupons available"/>
                    </div>)
                }
            </div>
        </div>
    )}

export default GetAllCoupons;

