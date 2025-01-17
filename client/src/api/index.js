import axios from "axios";
import queryString from "query-string";

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

//method post de axios
export const postUser = (values) =>
  httpClient.post("/users", values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getOneUser = (id) => httpClient.get(`/users/${id}`);
export const deleteOneUser = (id) => httpClient.delete(`/users/${id}`);

export const updateOneUser = (id, values) =>
  httpClient.put(`/users/${id}`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllUsers = (options = {}) => {
  const defaultOptions = {
    page: 1,
    amount: 4,
  };
  const resultOptions = {
    ...defaultOptions,
    ...options,
  };

  const { page, amount } = resultOptions;
  if (page && amount) {
    return httpClient.get(`/users?${queryString.stringify(resultOptions)}`);
  }
};
