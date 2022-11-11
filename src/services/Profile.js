import {
  apiUrl,
  getMethod,
  postMethod,
  postWithFromData,
} from "../components/Config/ApiHandler";
import { removeUserSession } from "../components/Config/SessionUtils";
import { toast } from "react-toastify";

export const fetchUserInfoById = (id) => {
  return getMethod(apiUrl.getUserInfo + id);
};

export const updateProfileById = (id, postData) => {
  return postWithFromData(apiUrl.getUserInfo + id, postData);
};

export const signOut = async (setLoader, history) => {
  await postMethod("/admin/logout", {})
    .then(() => {
      setLoader(false);
      removeUserSession();
      history.push("/");
      toast.success("Logout Successful!");
    })
    .catch((err) => {
      setLoader(false);
      toast.error(err.response.data.message);
    });
};
