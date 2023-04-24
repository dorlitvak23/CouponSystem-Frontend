import CustomerUserModel from "../Models/CustomerUserModel";
import { CouponModel } from "../Models/CouponModel";


export class CustomerState {
  public coupons: CouponModel[] = [];
  public customerCoupons: CouponModel[] = [];
  public customers: CustomerUserModel[] = [];
}


export enum CustomerActionType {
  GetCustomers = "getCustomers",
  GetCoupons = "getCoupons",
  AddCustomer = "addCustomer",
  PurchaseCoupon = "purchaseCoupon",
  UpdateCustomer = "updateCustomer",
  DeleteCustomer = "deleteCustomer",
  ClearCustomers = "clearCustomers",
  GetCustomerCoupons = "getCustomerCoupons",
  ClearCoupons = "clearCoupons",
  ClearCustomerCoupons = "clearCustomerCoupons",
}

export interface CustomerAction {
  type: CustomerActionType;
  payload?: any;
}

export function purchaseCouponAction(couponId: number): CustomerAction {
  return {
    type: CustomerActionType.PurchaseCoupon,
    payload: couponId,
  };
}

export function addCustomerAction(customer:CustomerUserModel): CustomerAction {
  return {
    type: CustomerActionType.AddCustomer,
    payload: customer,
  }
}

export function updateCustomerAction(customer: CustomerUserModel): CustomerAction {
  return {
    type: CustomerActionType.UpdateCustomer,
    payload: customer,
  };
}

export function deleteCustomerAction(customerId: number): CustomerAction {
  return {
    type: CustomerActionType.DeleteCustomer,
    payload: customerId,
  };
}

export function clearCustomersAction(): CustomerAction {
  return {
    type: CustomerActionType.ClearCustomers,
    payload: {},
  };
}

export function clearCouponAction(): CustomerAction {
  return {
    type: CustomerActionType.ClearCoupons,
    payload: {},
  };
}

export function clearCustomerCouponAction(): CustomerAction {
    return {
      type: CustomerActionType.ClearCoupons,
      payload: {},
    };
  }

export function getCustomersAction(customers: CustomerUserModel[]): CustomerAction {
  return {
    type: CustomerActionType.GetCustomers,
    payload: customers,
  };
}

export function getCustomerCouponsAction(
  coupons: CouponModel[]
): CustomerAction {
  return {
    type: CustomerActionType.GetCustomerCoupons,
    payload: coupons,
  };
}

export function getCouponsAction(
  coupons: CouponModel[]
): CustomerAction {
  return {
    type: CustomerActionType.GetCoupons,
    payload: coupons,
  };
}


export function CustomerReducer(
  currentState: CustomerState = new CustomerState(),
  action: CustomerAction
): CustomerState {
  const newState = { ...currentState };

  switch (action.type) {
    case CustomerActionType.PurchaseCoupon: 
      const coupon = newState.coupons.find((coupon) => coupon.id === action.payload);
      newState.customerCoupons.push(coupon); 
      break;
    case CustomerActionType.GetCustomers:
      newState.customers = action.payload;
      break;
    case CustomerActionType.GetCustomerCoupons:
      newState.customerCoupons = action.payload; 
      break;
      case CustomerActionType.GetCoupons:
      newState.coupons = action.payload; 
      break;
    case CustomerActionType.DeleteCustomer:
      newState.customers = newState.customers.filter(
        (customer) => customer.id !== action.payload);
      break;
      case CustomerActionType.UpdateCustomer:
        const customerId = newState.customers.findIndex((customer) => {
          return customer.id === action.payload.id;
        });
        newState.customers[customerId] = action.payload;
        break;
    case CustomerActionType.AddCustomer:
      console.log("action.payload   " + action.payload)
      newState.customers.push(action.payload);
      break;
    case CustomerActionType.ClearCustomers:
      newState.customers = [];
      break;
    case CustomerActionType.ClearCoupons:
      newState.coupons = [];
      break;
      case CustomerActionType.ClearCustomerCoupons:
      newState.customerCoupons = [];
      break;
  }
  return newState;
}
