import { getRequest, postRequest } from "../../../Config/Axios/AxiosConfig";

export const fetchAllTasks = async () => {
  return await getRequest("tasks");
};

export const createTask = async (task) => {
  return await postRequest("tasks", task);
};
