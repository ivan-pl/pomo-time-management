import axios from "axios";
import type { Task } from "../../types/task.type";

type ResponseApi = {
  [P: string]: Omit<Task, "id">;
} | null;

export async function getHistory(): Promise<Task[]> {
  const response = await axios.get<ResponseApi>("/tasks/history.json");
  const data = response.data;
  const tasks = data
    ? Object.entries(data).map(([id, task]) => ({ ...task, id }))
    : [];
  return tasks.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
}
