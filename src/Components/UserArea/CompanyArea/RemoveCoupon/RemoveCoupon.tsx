import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import { removeCouponApi } from '../../../../WebApi/CompanyApi';
import ClientType from '../../../../Models/ClientType';
import { CouponModel } from '../../../../Models/CouponModel';
import store from '../../../../Redux/Store';
import notificationService from '../../../../Services/NotificationService';
import { deletedCouponAction } from '../../../../Redux/CompanyAppState';

function RemoveCoupon() {
    const requiredType = ClientType.COMPANY;
    const navigate = useNavigate();
    const params = useParams();
    const couponId= +(params.id || "");
    
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
    
    const removeCoupon = async ()=> {
        await removeCouponApi(couponId).then((any)=>{
            notificationService.success("Coupon deleted successfully");
            store.dispatch(deletedCouponAction(couponId));
        })
        .catch ((error)=>{
            notificationService.error(error)
        })
        navigate("/company/coupons"); 
    }

    const cancelRemoveCoupon = ()=> {
        navigate("/company/coupons"); 
    }
    
    return (
        <div>
            <h2>Delete Coupon From Database</h2>
            <span>are you sure?</span>
            <button className="button-success" onClick={removeCoupon}>Delete Now</button>
            <button className="button-cancel" onClick={cancelRemoveCoupon}>Return</button>
        </div>
    );
}

export default RemoveCoupon;