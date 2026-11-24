import {
  deleteBookAPI,
  fetchAdminBooksAPI,
  fetchBookAPI,
  postNewBookAPI,
  updateBookAPI,
} from "./bookAPI";
import { setBooks, setSelectedBook } from "./bookSlice";

export const fetchAdminBooksAction = () => async (dispatch) => {
  const { status, payload } = await fetchAdminBooksAPI();
  status === "success" && Array.isArray(payload) && dispatch(setBooks(payload));
};

export const fetchSingleBookAction = (_id) => async (dispatch) => {
  dispatch(setSelectedBook({}));
  const { status, payload } = await fetchBookAPI(_id);
  status === "success" && payload?._id && dispatch(setSelectedBook(payload));
  return status;
};

//mutations refresh the list and return the status so pages can navigate
export const postNewBookAction = (formData) => async (dispatch) => {
  const { status } = await postNewBookAPI(formData);
  status === "success" && dispatch(fetchAdminBooksAction());
  return status;
};

export const updateBookAction = (_id, formData) => async (dispatch) => {
  const { status } = await updateBookAPI(_id, formData);
  status === "success" && dispatch(fetchAdminBooksAction());
  return status;
};

export const deleteBookAction = (_id) => async (dispatch) => {
  const { status } = await deleteBookAPI(_id);
  status === "success" && dispatch(fetchAdminBooksAction());
  return status;
};
