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

export const getOneTask = (userId, taskId) => httpClient.get(`/users/${userId}/tasks/${taskId}`);
export const updateOneTask = (userId,taskId, values) => httpClient.put(`users/${userId }/tasks/${taskId}`, values);
export const deleteOneTask = (userId,taskId) => httpClient.delete(`users/${userId}/tasks/${taskId}`);   
export const postTask = (userId, values) => httpClient.post(`users/${userId}/tasks`, values);


export const getAllTasks = (userId, options = {}) => {
  const defaultOptions = {
    page: 1,
    amount: 4,
  };
  const resultOptions = { ...defaultOptions, ...options };

  return httpClient.get(`/users/${userId}/tasks?${queryString.stringify(resultOptions)}`);
};

