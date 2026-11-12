import { fetchUserAPI } from "./userAPI";
import { setUser } from "./userSlice";

export const fetchUserAction = () => async (dispatch) => {
  //call api
  //call api to get user
  const { status, payload } = await fetchUserAPI();

  //recieve user
  //dispatch user to redux store

  status === "success" && payload?._id && dispatch(setUser(payload));
};

export const autoLogin = () => (dispatch) => {
  const accessJWT = sessionStorage.getItem("accesJWT");
  if (accessJWT) {
    dispatch(fetchUserAction());
    return;
  }
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (refreshJWT) {
    //fetch accessJWT and set it in the sessionStorage
    //dispatch(fetchUserActiom())
  }
};
