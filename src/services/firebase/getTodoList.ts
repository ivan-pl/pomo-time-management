import axios from "axios";
import type { Task } from "../../types/task.type";

type ResponseApi = {
  [P: string]: Omit<Task, "id">;
};

export async function getTodoList(): Promise<Task[]> {
  const response = await axios.get<ResponseApi>("tasks/todoList.json");
  return Object.entries(response.data).map(([id, task]) => ({ ...task, id }));
}
