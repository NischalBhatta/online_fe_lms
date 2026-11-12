import axios from "axios";
import { toast } from "react-toastify";

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
    const msg = error?.response?.data?.message || error.message;
    showToast && toast.error(msg);
    if (error.status === 401 && msg === "jwt expired") {
      //call api to get new accessJWT
      const { payload } = await fetchNewAccessJWTApi();
      if (payload) {
        sessionStorage.setItem("accessJWT", payload);
        return apiProcessor({
          url,
          method,
          payload,
          showToast,
          isPrivateCall,
          isRefreshJWT,
        });
      }

      //call the apiProcessor()
    } else {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }

    return {
      status: "error",
      message: msg,
    };
  }
};
