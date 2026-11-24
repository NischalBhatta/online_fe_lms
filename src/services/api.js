import axios from "axios";
import { toast } from "react-toastify";
import { fetchNewAccessJWTApi } from "./authAPI";
import store from "../redux/store";
import { setUser } from "../features/user/userSlice";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

export const apiProcessor = async ({
  url,
  method,
  payload,
  showToast,
  isPrivateCall,
  isRefreshJWT,
  isRetry = false,
}) => {
  try {
    const headers = {};

    if (isPrivateCall) {
      const token = isRefreshJWT ? getRefreshJWT() : getAccessJWT();
      headers.authorization = "bearer " + token;
    }
    const responsePending = axios({
      url,
      method,
      data: payload,
      headers,
    });

    //show toast message
    if (showToast) {
      toast.promise(responsePending, {
        pending: "Please Wait ....",
      });
    }
    const { data } = await responsePending;
    showToast && toast[data.status](data.message);

    return data;
  } catch (error) {
    console.log(error);
    let msg = error?.response?.data?.message || error.message;
    const isUnauthorized = error?.response?.status === 401;

    //expired access token: renew it silently and retry the request once
    if (isUnauthorized && msg === "jwt expired" && !isRetry) {
      const { payload: newAccessJWT } = await fetchNewAccessJWTApi();
      if (newAccessJWT) {
        sessionStorage.setItem("accessJWT", newAccessJWT);
        return apiProcessor({
          url,
          method,
          payload,
          showToast,
          isPrivateCall,
          isRefreshJWT,
          isRetry: true,
        });
      }
    }

    //only an auth failure ends the session; other errors (e.g. validation) keep the user logged in
    if (isUnauthorized && isPrivateCall) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
      //clearing the user makes AuthRoute redirect to /login
      store.dispatch(setUser({}));
      msg = "Your session has expired. Please log in again.";
    }

    //the refresh call itself never toasts; the original request reports the outcome
    showToast && !isRefreshJWT && toast.error(msg);

    return {
      status: "error",
      message: msg,
    };
  }
};
