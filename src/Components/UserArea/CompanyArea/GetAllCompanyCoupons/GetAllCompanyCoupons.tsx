import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { getAllCompanyCouponsApi, getCompanyInfoApi, removeCouponApi } from '../../../../WebApi/CompanyApi';
import ClientType from '../../../../Models/ClientType';
import { CouponModel } from '../../../../Models/CouponModel';
import store from '../../../../Redux/Store';
import notificationService from '../../../../Services/NotificationService';
import { addedCompanyAction, gotCompanyCouponsAction } from '../../../../Redux/CompanyAppState';
import CustomLink from '../../../SharedArea/CustomLink/CustomLink';
import { BsPencilSquare } from 'react-icons/bs';
import EmptyView from '../../../SharedArea/EmptyView/EmptyView';
import CouponCard from '../../../SharedArea/Cards/CouponCard/CouponCard';
import CompanyUserModel from '../../../../Models/CompanyUserModel';
import { Category } from '../../../../Models/Category';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function GetAllCompanyCoupons() {
    const requiredType = ClientType.COMPANY;
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [category, setCategory] = useState<String>("ALL");
    const [maxPrice, setMaxPrice] = useState<number>(0);

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

    useEffect(() => {
        getAllCompanyCoupons();
    }, [])

    const getAllCompanyCoupons = async () => {
        await getAllCompanyCouponsApi().then((res) => {
            notificationService.success("Got coupons successfully");
            store.dispatch(gotCompanyCouponsAction(res.data));
            setCoupons(res.data);
        })
            .catch((error) => {
                notificationService.error(error);
            })
    }



    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
        let filteredCoupons = store.getState().companyReducer.coupons;
        if (maxPrice !== 0) {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => {
                        return coupon.price <= maxPrice
                    });
        }
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
        let filteredCoupons = store.getState().companyReducer.coupons;
        console.log(category);
        if (category !== "ALL") {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => {
                        return coupon.category.valueOf() === category
                    });
        }
        if (Number(e.currentTarget.value) !== 0) {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => {
                        return coupon.price <= Number(e.currentTarget.value)
                    });
        }
        setCoupons(filteredCoupons);
    }


    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>All Coupons</h1>
            <div>
                <NavLink to="/home">
                    Back
                </NavLink>
                <Button style={{ marginBottom: 20 }} onClick={() => window.location.assign("/company/coupon/add")}>
                    <BsPencilSquare size={25} />Add Coupon
                </Button>


                <label htmlFor="category"></label>
                <select name='category' placeholder="category" onChange={(e) => handleCategoryChange(e)} defaultValue="ALL" id="category">
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
                <br />
                <label htmlFor="price">Coupon Price</label>
                <input type="number" min={0} max={999_999} step={1} defaultValue={0} onChange={(e) => handleMaxPriceChange(e)} id="price" name='price' />
            </div>
            {
                coupons.length > 0 ?
                    (<div style={{ marginTop: 20, display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                        {coupons.map((coupon, index) => (
                            <CouponCard key={index} purchasable={false} owned={false} coupon={coupon} />
                        ))}
                    </div>) :
                    (<div className="empty_view">
                        <EmptyView msg="no coupons available" />
                    </div>)
            }
        </div>
    )
}

export default GetAllCompanyCoupons;