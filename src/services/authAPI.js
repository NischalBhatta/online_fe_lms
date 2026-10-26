// all API call related to signup, login and token

import { apiProcessor } from "./api";

// const apiBaseUrl = process.env.
const apiBaseUrl = "http://localhost:8000";
const authApiEP = apiBaseUrl + "/api/v1/auth";

export const signUPNewUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/register",
    method: "POST",
    payload,
    showToast: true,
  };
  const result = await apiProcessor(obj);
  return result;
};
