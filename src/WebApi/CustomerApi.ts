import { CouponModel } from "../Models/CouponModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import appConfig from "../Utils/AppConfig";
import tokenAxios from "../Utils/Interceptors";


const customerUrl = appConfig.customerUrl;

export async function getAllCouponsByCategoryApi(category: string) {
  return await tokenAxios.get<CouponModel[]>(customerUrl + "coupons/category", {params: { category: category }});
}

export async function getAllCouponsPriceLessThan(price: number) :Promise<any>{ // TODO: promise
  return await tokenAxios.get<CouponModel[]>(
    customerUrl + "coupons/price?price=" + price);
}

export async function getCustomerInfoApi() {
  return await tokenAxios.get<CustomerUserModel>(customerUrl + "info");
}

export async function purchaseCouponApi(couponId: number) {
  return await tokenAxios.put<CouponModel>(customerUrl + "coupons/" + couponId);
}

export async function getAllCouponsApi() {
  return await tokenAxios.get<CouponModel[]>(customerUrl + "coupons/all");

}

export async function getAllCustomerCouponsApi() {
  return await tokenAxios.get<CustomerUserModel[]>(customerUrl + "coupons");
}