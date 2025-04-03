import api from "../config";

export const tasksService = {
  // Create a new task with the given data
  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  // Retrieve all tasks
  getAllTasks: async () => {
    const response = await api.get("/tasks");
    return response.data;
  },

  // Fetch a specific task by its ID
  getTaskById: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  // Update an existing task by ID with new data
  updateTask: async (taskId, updatedData) => {
    const response = await api.put(`/tasks/${taskId}`, updatedData);
    return response.data;
  },

  // Delete a task by its ID
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
};
