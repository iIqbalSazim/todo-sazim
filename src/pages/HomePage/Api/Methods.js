import { getRequest } from "../../../Config/Axios/AxiosConfig";

export const fetchAllTasks = async () => {
  return await getRequest("tasks");
};
