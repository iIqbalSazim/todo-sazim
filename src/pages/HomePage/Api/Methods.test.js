import {
  fetchAllTasks,
  createTask,
  updateTask,
  updateTaskIsCompleted,
  updateTaskIsDeleted,
  retrieveArchived,
  deleteTask,
  deleteAllTasks,
} from "./Methods";
import * as AxiosConfig from "../../../Config/Axios/AxiosConfig";

jest.mock("../../../Config/Axios/AxiosConfig");

describe("API Methods", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("fetches all tasks", async () => {
    const mockData = [
      { id: 1, description: "Task 1" },
      { id: 2, description: "Task 2" },
    ];
    AxiosConfig.getRequest.mockResolvedValueOnce({ data: mockData });
    const response = await fetchAllTasks();
    expect(response.data).toEqual(mockData);
    expect(AxiosConfig.getRequest).toHaveBeenCalledWith("tasks");
  });

  test("creates a task", async () => {
    const taskData = { description: "New Task" };
    AxiosConfig.postRequest.mockResolvedValueOnce({ data: taskData });
    const response = await createTask(taskData);
    expect(response.data).toEqual(taskData);
    expect(AxiosConfig.postRequest).toHaveBeenCalledWith("tasks", taskData);
  });

  test("updates a task", async () => {
    const taskId = 1;
    const updatedTaskData = { description: "Updated Task" };
    AxiosConfig.putRequest.mockResolvedValueOnce({ data: updatedTaskData });
    const response = await updateTask(taskId, updatedTaskData);
    expect(response.data).toEqual(updatedTaskData);
    expect(AxiosConfig.putRequest).toHaveBeenCalledWith(
      `tasks/${taskId}`,
      updatedTaskData
    );
  });

  test("updates task completion status", async () => {
    const taskId = 1;
    const updatedTaskData = { is_completed: true };
    AxiosConfig.patchRequest.mockResolvedValueOnce({ data: updatedTaskData });
    const response = await updateTaskIsCompleted(taskId, updatedTaskData);
    expect(response.data).toEqual(updatedTaskData);
    expect(AxiosConfig.patchRequest).toHaveBeenCalledWith(
      `tasks/${taskId}`,
      updatedTaskData
    );
  });

  test("updates task deletion status", async () => {
    const taskId = 1;
    const updatedTaskData = { is_deleted: true };
    AxiosConfig.patchRequest.mockResolvedValueOnce({ data: updatedTaskData });
    const response = await updateTaskIsDeleted(taskId, updatedTaskData);
    expect(response.data).toEqual(updatedTaskData);
    expect(AxiosConfig.patchRequest).toHaveBeenCalledWith(
      `tasks/${taskId}`,
      updatedTaskData
    );
  });

  test("retrieves archived tasks", async () => {
    const response = await retrieveArchived();
    expect(AxiosConfig.patchRequest).toHaveBeenCalledWith("archived");
  });

  test("deletes a task", async () => {
    const taskId = 1;
    const response = await deleteTask(taskId);
    expect(AxiosConfig.deleteRequest).toHaveBeenCalledWith(`tasks/${taskId}`);
  });

  test("deletes all tasks", async () => {
    const type = "completed";
    const response = await deleteAllTasks(type);
    expect(AxiosConfig.deleteRequest).toHaveBeenCalledWith(
      `delete_all?type=${type}`
    );
  });
});
