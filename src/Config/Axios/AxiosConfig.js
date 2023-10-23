import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:3000/api/v1";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.defaults.timeout = 5000;

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      alert("Network Error. Please check your internet connection.");
    } else if (error.response) {
      if (error.response.status === 400) {
        alert("400 Bad request error");
      }
      if (error.response.status === 403) {
        alert("403 Forbidden - You are not authorized.");
      }
      if (error.response.status === 404) {
        alert("404 Not Found");
      }
    } else {
      alert("Something went wrong!");
    }
  }
);

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
