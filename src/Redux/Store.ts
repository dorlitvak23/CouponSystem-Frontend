import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { companyReducer } from "./CompanyAppState";
import { CustomerReducer } from "./CustomerAppState";

const reducers = combineReducers({authReducer:authReducer, companyReducer:companyReducer, customerReducer:CustomerReducer});
const store = createStore(reducers);


export default store;