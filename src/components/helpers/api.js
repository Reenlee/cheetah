import axios from "axios";

const getRequest = (route, params) => axios.get(route, { params });

const postRequest = (route, data, params) =>
  axios.post(route, data, { params });

const putRequest = (route, data, params) => {
  const { id, ...rest } = data || {};
  return axios.put(route, rest, { params });
};

const deleteRequest = (route, params) => axios.delete(route, { params });

export { getRequest, postRequest, putRequest, deleteRequest };
