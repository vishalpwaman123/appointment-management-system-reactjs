import AxiosServices from "./AxiosServices";
const axiosServices = new AxiosServices();

const SignIn = "https://localhost:7040/api/Auth/SignIn";

export default class AuthenticateService {

  SignIn(data) {
    return axiosServices.Post(SignIn, data, false);
  }
}
