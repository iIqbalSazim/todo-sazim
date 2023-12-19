import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
} from "../../../Config/Axios/AxiosConfig";

export const fetchAllTasks = async () => {
  return await getRequest("tasks");
};

export const createTask = async (task) => {
  return await postRequest("tasks", task);
};

export const updateTask = async (id, task) => {
  return await putRequest(`tasks/${id}`, task);
};

export const updateTaskIsCompleted = async (id, task) => {
  return patchRequest(`tasks/${id}`, task);
};

export const updateTaskIsDeleted = async (id, task) => {
  return await patchRequest(`tasks/${id}`, task);
};

export const retrieveArchived = async () => {
  return await patchRequest(`archived`);
};

export const deleteTask = async (id) => {
  return await deleteRequest(`tasks/${id}`);
};

export const deleteAllTasks = async (task) => {
  return await postRequest(`delete_all`, task);
};
