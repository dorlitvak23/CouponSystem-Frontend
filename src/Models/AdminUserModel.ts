import ClientType from "./ClientType";
import UserModel from "./UserModel";

class AdminUserModel extends UserModel {
	
    public constructor(clientType: ClientType, id: number,email: string, password: string,  name: string){
        super(clientType, id, email, password)
         }
}

export default AdminUserModel;
