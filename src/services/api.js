import axios from "axios";

export const apiProcessor = async ({ url, method, payload }) => {
  try {
    const { data } = await axios({
      url,
      method,
      data: payload,
      // headers
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
