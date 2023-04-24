import React from 'react';
import { purchaseCouponAction } from '../../../../Redux/CustomerAppState';
import store from '../../../../Redux/Store';
import notificationService from '../../../../Services/NotificationService';
import { purchaseCouponApi } from '../../../../WebApi/CustomerApi';

async function PurchaseCoupon(id: number) {
    console.log('PurchaseCoupon');
    await purchaseCouponApi(id).then(() => {
        notificationService.success("Coupon purchased successfully");
        store.dispatch(purchaseCouponAction(id));
    })
    .catch((error) => {
        notificationService.error(error);
    })

}

export default PurchaseCoupon;