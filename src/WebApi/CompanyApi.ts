import CompanyUserModel from "../Models/CompanyUserModel";
import { CouponModel } from "../Models/CouponModel";
import appConfig from "../Utils/AppConfig";
import tokenAxios from "../Utils/Interceptors";



const companyUrl = appConfig.companyUrl;

export async function addCouponApi(coupon: CouponModel) {
    return await tokenAxios.post<CouponModel>(companyUrl+"coupons", coupon);
}

export async function updateCouponApi(coupon: CouponModel) {
    return await tokenAxios.put<CouponModel>(companyUrl+"coupons/"+coupon.id,coupon)
}

export async function removeCouponApi(couponId: number) {
    return await tokenAxios.delete<any>(companyUrl+"coupons/"+couponId);
}

export async function getAllCompanyCouponsApi() {
    return await tokenAxios.get<CouponModel[]>(companyUrl+"coupons/all");
}

export async function getAllCouponsByCategoryApi(category: string) {
    return await tokenAxios.get<CouponModel[]>(companyUrl+"coupons/category?category="+category);
}

export async function getAllCouponsPriceLessThan(price : number) {
    return await tokenAxios.get<CouponModel[]>(companyUrl+"coupons/price?price="+price);
}

export async function getCouponApi(couponId: number) {
    return await tokenAxios.get<CouponModel>(companyUrl+"coupons/"+couponId);
}

export async function getCompanyInfoApi() {
    return await tokenAxios.get<CompanyUserModel>(companyUrl+"info");
}