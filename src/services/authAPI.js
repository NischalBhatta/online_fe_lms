// all API call related to signup, login and token

import { apiProcessor } from "./api";

// const apiBaseUrl = process.env.
const apiBaseUrl = import.meta.env.VITE_ROOT_API;
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
export const activateNewUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/activate-user",
    method: "POST",
    payload,
  };
  return apiProcessor(obj);
};
export const signinUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/login",
    method: "POST",
    payload,
    showToast: true,
  };
  return apiProcessor(obj);
};
