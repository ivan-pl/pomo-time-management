import axios from "axios";
import type { Task } from "../../types/task.type";

export async function updateTask(task: Task): Promise<boolean> {
  const { id, ...bodyTask } = task;
  const response = await axios.put(`/tasks/todoList/${id}.json`, bodyTask);
  return response.status === 200;
}
