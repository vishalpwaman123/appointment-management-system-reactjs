import AxiosServices from "./AxiosServices";
const axiosServices = new AxiosServices();

const AddAppointment = "https://localhost:7040/api/Customer/AddAppointment";
const CancelAppointment = "https://localhost:7040/api/Customer/CancelAppointment?Id=";
const GetAppointmentList =
  "https://localhost:7040/api/Customer/GetAppointmentList?UserId=";

export default class CustomerServices {
  //
  AddAppointment(data) {
    return axiosServices.Post(AddAppointment, data, false);
  }

  GetAppointmentList(data) {
    return axiosServices.Get(GetAppointmentList + data, false);
  }

  CancelAppointment(data) {
    return axiosServices.Delete(CancelAppointment + data, false);
  }

  
}
