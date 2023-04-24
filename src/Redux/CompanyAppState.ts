import CompanyUserModel from "../Models/CompanyUserModel";
import { CouponModel } from "../Models/CouponModel";


export class CompanyAppState{
    public coupons: CouponModel[]=[];
    public companies: CompanyUserModel[] = [];
}

export enum ActionType{
    GOT_ALL_COUPONS="GOT_ALL_COUPONS",
    GOT_ONE_COUPON="GOT_ONE_COUPON",
    ADDED_COUPON="ADDED_COUPON",
    UPDATED_COUPON="UPDATE_COUPON",
    DELETED_COUPON="DELETED_COUPON",
    GOT_ALL_COMPANIES="GOT_ALL_COMPANIES",
    GOT_ONE_COMPANY="GOT_ONE_COMPANY",
    ADDED_COMPANY="ADDED_COMPANY",
    DELETED_COMPANY="DELETED_COMPANY",
    UPDATED_COMPANY="UPDATED_COMPANY",
    GOT_COMPANY_COUPONS="GOT_COMPANY_COUPONS",
    REMOVED_COUPONS ="REMOVED_COUPONS",
    REMOVED_COMPANIES="REMOVED_COMPANIES",
}


export interface CompanyAction {
    type: ActionType;
    payload?: any;
}

export function addedCompanyAction(company:CompanyUserModel): CompanyAction{
    return{
        type: ActionType.ADDED_COMPANY,
        payload:company
    }
}

export function updatedCompanyAction(company:CompanyUserModel): CompanyAction{
    return{
        type: ActionType.UPDATED_COMPANY,
        payload:company
    }
}

export function deletedCompanyAction(companyId:number): CompanyAction{
    return{
        type: ActionType.DELETED_COMPANY,
        payload:companyId
    }
}

export function gotCompaniesAction(companies: CompanyUserModel[]): CompanyAction {
    return {
      type: ActionType.GOT_ALL_COMPANIES,
      payload: companies
    }
}

export function gotOneCompanyAction(company:CompanyUserModel): CompanyAction {
    return {
        type: ActionType.GOT_ONE_COMPANY,
        payload: company
    };
}

export function gotCompanyCouponsAction(coupons: CouponModel[]): CompanyAction {
    return {
      type: ActionType.GOT_COMPANY_COUPONS,
      payload: coupons
    }
}

export function gotAllCouponsAction(coupons: CouponModel[]): CompanyAction {
    return {
        type: ActionType.GOT_ALL_COUPONS,
        payload: coupons
    };
}

export function gotOneCouponAction(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.GOT_ONE_COUPON,
        payload: coupon
    };
}


export function addedCouponAction(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.ADDED_COUPON,
        payload: coupon
    };
}

export function updatedCouponAction(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.UPDATED_COUPON,
        payload: coupon
    };
}

export function deletedCouponAction(id: number): CompanyAction {
    return {
        type: ActionType.DELETED_COUPON,
        payload: id
    }
}

export function removedCouponsAction(): CompanyAction {
    return {
        type: ActionType.REMOVED_COUPONS,
        payload: {}
    }
}

export function removedCompaniesAction(): CompanyAction {
    return {
      type: ActionType.REMOVED_COMPANIES,
      payload: {}
    }
}

export function companyReducer(currentState: CompanyAppState = new CompanyAppState(),action:CompanyAction): CompanyAppState{


    const newState = {...currentState} 
    switch(action.type){
        case ActionType.GOT_ALL_COUPONS: {
            newState.coupons = action.payload;
            break;
        }

        case ActionType.ADDED_COUPON:{
            newState.coupons.push(action.payload);
            break;
        }

        case ActionType.UPDATED_COUPON: {
            console.log("Before " + action.payload.id)
            let index = newState.coupons.findIndex((c)=> c.id === action.payload.id)
            // newState.coupons = newState.coupons.filter((coupon) => coupon.id !== action.payload);
            newState.coupons[index] = action.payload;
            break;

        }

        case ActionType.DELETED_COUPON: {
            newState.coupons = newState.coupons.filter((coupon) => coupon.id !== action.payload);
            break;
        }

        case ActionType.REMOVED_COUPONS: {
            newState.coupons = [];
            break;
        }

        case ActionType.GOT_ALL_COMPANIES: {
            newState.companies = action.payload;
            break;
        }

        case ActionType.GOT_ONE_COMPANY:{

            break;
        }

        case ActionType.ADDED_COMPANY:{
            newState.companies.push(action.payload);
            break;
        }

        case ActionType.DELETED_COMPANY:{
            newState.companies = newState.companies.filter((company) => company.id !== action.payload);
            break;
        }

        case ActionType.UPDATED_COMPANY:{
            const idx = newState.companies.findIndex((company) => company.id === action.payload.id);
            newState.companies[idx] = action.payload;
            break;
        }

        case ActionType.GOT_COMPANY_COUPONS:{
            console.log("action.payload " + action.payload);

            newState.coupons = action.payload;
            console.log("newState.coupons " + newState.coupons);

            break;
        }

        case ActionType.REMOVED_COMPANIES: {
            newState.companies = [];
            break;
        }

    }
    return newState;

}

