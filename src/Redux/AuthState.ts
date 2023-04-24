import { createStore } from "redux";
import ClientType from "../Models/ClientType";
import UserModel from "../Models/UserModel";


// 1. Application State - the data in the application level
export class AuthState {
    public user: UserModel = null;
    public token: string = null;

    public constructor() {
        this.token = sessionStorage.getItem("token"); // init token

        if (this.token) {
            let clientTypeStr = sessionStorage.getItem("clientType");
            let clientType;
            if (clientTypeStr === ClientType.ADMIN) {
                clientType = ClientType.ADMIN;
            }else if(clientTypeStr === ClientType.COMPANY){
                clientType = ClientType.COMPANY;
            }else if(clientTypeStr === ClientType.CUSTOMER){
                clientType = ClientType.CUSTOMER;
            }
            // init user
            this.user = new UserModel(clientType, +sessionStorage.getItem("id"), sessionStorage.getItem("email"));
        }
    }
}

// 2. Action Type - what we can do with that data
export enum AuthActionType {
    Login = "Login", // saves the token + update the user
    Logout = "Logout"// delete the token + clear the user
}

// 3. Action - An object describing one action to perform on that data
export interface AuthAction {
    type: AuthActionType;
    payload?: { token: string, id: number, name: string, email: string, clientType: ClientType }; // For Login the payload is LoginResponse, for Logout we don't have a payload
}

// 4. Reducer - The function performing the needed operation
// When we call dispatch redux calls this function
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // a. Duplicate the state:
    const newState = { ...currentState }; // Spread Operator.

    // b. Perform the action on the duplicated state: 
    switch (action.type) {
        case AuthActionType.Login: // Here the payload is the data (user + token).

            newState.token = action.payload.token; // token

            let clientType = action.payload.clientType;
            let id = action.payload.id;
            let email = action.payload.email;
            const user = new UserModel(clientType, id, email);
            newState.user = user; // user

            // newState.user = extractUser(newState.token);
            sessionStorage.setItem("token", newState.token);
            sessionStorage.setItem("clientType", user.clientType.toString());
            sessionStorage.setItem("id", user.id.toString());
            sessionStorage.setItem("email", user.email);
            break;
        case AuthActionType.Logout: // Here we don't have a payload.
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("clientType");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("email");
            break;
    }

    // c. Return the duplicated state: 
    return newState;
}

// 5. Store - The manager which can do dispatch, getState and subscribe
export const authStore = createStore(authReducer);
