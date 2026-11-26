import {
  deleteBookAPI,
  fetchAdminBooksAPI,
  fetchBookAPI,
  fetchPublicBooksAPI,
  postNewBookAPI,
  updateBookAPI,
} from "./bookAPI";
import {
  setBooks,
  setIsLoading,
  setPublicBooks,
  setSelectedBook,
} from "./bookSlice";

//Public catalog: active books for the HomePage
export const fetchPublicBooksAction = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  const { status, payload } = await fetchPublicBooksAPI();
  status === "success" &&
    Array.isArray(payload) &&
    dispatch(setPublicBooks(payload));
  dispatch(setIsLoading(false));
};

export const fetchAdminBooksAction = () => async (dispatch) => {
  const { status, payload } = await fetchAdminBooksAPI();
  status === "success" && Array.isArray(payload) && dispatch(setBooks(payload));
};

//single book for the details and edit pages; returns the status so pages know found/not found
export const fetchSingleBookAction = (_id) => async (dispatch) => {
  dispatch(setSelectedBook({}));
  dispatch(setIsLoading(true));
  const { status, payload } = await fetchBookAPI(_id);
  status === "success" && payload?._id && dispatch(setSelectedBook(payload));
  dispatch(setIsLoading(false));
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
