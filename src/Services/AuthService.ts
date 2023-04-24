import { AuthActionType } from "../Redux/AuthState";
import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import appConfig from "../Utils/AppConfig";
import store from "../Redux/Store";


class AuthService {

    // Login to backend:
    public async login(credentials: CredentialsModel): Promise<void> {

        // send credentials to backend, get back response:
        const response: any = await axios.post<string>(appConfig.loginUrl, credentials);


        // Extract token:
        const data = response.data;
        console.log("========================");
        console.log(data);

        // Update redux:
        store.dispatch({ type: AuthActionType.Login, payload: data });
    }

    // Logout:
    public logout(): void {

        // Update redux:
        store.dispatch({ type: AuthActionType.Logout });
    }

}

const authService = new AuthService();

export default authService