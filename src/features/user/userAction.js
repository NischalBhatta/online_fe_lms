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
