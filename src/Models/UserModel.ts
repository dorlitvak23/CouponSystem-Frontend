import ClientType from "./ClientType";

class UserModel {
    public id: number;
    public email: string;
    public password: string;
	public clientType: ClientType;


public constructor(clientType: ClientType, id: number,email: string, password?: string ){
this.clientType = clientType;
this.id = id;
this.email = email;
this.password = password;
}

}

export default UserModel;
