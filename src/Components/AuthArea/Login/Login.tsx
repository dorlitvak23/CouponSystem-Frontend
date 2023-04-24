import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {

  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notificationService.success("Logged-in successfully");
      navigate("/home");
    } catch (err: any) {
      notificationService.error(err);
      console.log(err)
    }
  }
  return (
    <div className="Login">

      <form onSubmit={handleSubmit(send)}>

        <label >Client Type: </label>
        <select defaultValue="" required {...register("clientType")}>
          <option disabled value="">Select Client Type...</option>
          <option value={ClientType.CUSTOMER}>Customer</option>
          <option value={ClientType.COMPANY}>Company</option>
          <option value={ClientType.ADMIN}>Admin</option>
        </select>

        <label>Email: </label>
        <input type="email" required {...register("email")} />

        <label>Password: </label>
        <input type="password" required {...register("password")} />
        <br/>
        <br/>

        <button>Login</button>


      </form>

    </div>
  );
}

export default Login;
