// call api processor to fetch user

import { apiProcessor } from "../../services/api";

const apiBaseUrl = import.meta.env.VITE_ROOT_API;
const userApiEP = apiBaseUrl + "/api/v1/users";

export const fetchUserAPI = async () => {
  const obj = {
    url: userApiEP + "/profile",
    method: "GET",
    showToast: false,
    isPrivateCall: true,
  };

  const result = await apiProcessor(obj);
  return result;
};
