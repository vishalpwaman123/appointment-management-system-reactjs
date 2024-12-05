import AxiosServices from "./AxiosServices";
const axiosServices = new AxiosServices();

const AddPost = "https://localhost:7040/api/Customer/AddPost";
const GetPostByUserId =
  "https://localhost:7040/api/Customer/GetPostByUserId?userId=";

export default class CustomerServices {
  //
  AddPost(data) {
    return axiosServices.Post(AddPost, data, false);
  }

  GetPostByUserId(data) {
    return axiosServices.Get(GetPostByUserId + data, false);
  }

  UpdatePost(data) {
    return axiosServices.Put(UpdatePost, data, false);
  }

  DeletePost(data) {
    return axiosServices.Delete(DeletePost + data, false);
  }

  //
  AddLike(data) {
    return axiosServices.Post(AddLike, data, false);
  }

  AddComment(data) {
    return axiosServices.Post(AddComment, data, false);
  }

  GetCommentByPostId(data) {
    return axiosServices.Get(GetCommentByPostId + data, false);
  }

  //
  AddMessage(data) {
    return axiosServices.Post(AddMessage, data, false);
  }

  GetMessage(data) {
    return axiosServices.Get(
      GetMessage + data.receiverId + "&SenderUserId=" + data.SenderUserId,
      null,
      false
    );
  }

  DeleteMessage(data) {
    return axiosServices.Delete(DeleteMessage + `${data}`, false);
  }

  ReportPost(data) {
    return axiosServices.Post(ReportPost, data, false);
  }

  SearchUser(data) {
    return axiosServices.Get(SearchUser + `${data}`, false);
  }
}
