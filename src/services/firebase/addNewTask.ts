import axios from "axios";
import type { Task } from "../../types/task.type";

export async function addNewTask(task: Omit<Task, "id">): Promise<string> {
  const response = await axios.post<{ name: string }>(
    "tasks/todoList.json",
    task,
  );
  return response.data.name;
}
