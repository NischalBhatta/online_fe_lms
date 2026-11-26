import { apiProcessor } from "@services/api";

const apiBaseUrl = import.meta.env.VITE_ROOT_API;
const bookApiEP = apiBaseUrl + "/api/v1/books";

//Public: active books for the catalog
export const fetchPublicBooksAPI = () => {
  return apiProcessor({
    url: bookApiEP,
    method: "get",
  });
};

//Admin: all books, including inactive
export const fetchAdminBooksAPI = () => {
  return apiProcessor({
    url: bookApiEP + "/admin",
    method: "get",
    isPrivateCall: true,
  });
};

export const fetchBookAPI = (_id) => {
  return apiProcessor({
    url: bookApiEP + "/" + _id,
    method: "get",
  });
};

//formData: FormData with book fields and optional "image" file
export const postNewBookAPI = (formData) => {
  return apiProcessor({
    url: bookApiEP,
    method: "post",
    payload: formData,
    isPrivateCall: true,
    showToast: true,
  });
};

export const updateBookAPI = (_id, formData) => {
  return apiProcessor({
    url: bookApiEP + "/" + _id,
    method: "put",
    payload: formData,
    isPrivateCall: true,
    showToast: true,
  });
};

export const deleteBookAPI = (_id) => {
  return apiProcessor({
    url: bookApiEP + "/" + _id,
    method: "delete",
    isPrivateCall: true,
    showToast: true,
  });
};
