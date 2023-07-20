import axios from "axios";
import { Task } from "../../types/task.type";

export async function addTaskToHistory(task: Task): Promise<string> {
  axios.delete(`/tasks/todoList/${task.id}.json`);
  const response = await axios.post<{ name: string }>("tasks/history.json", {
    name: task.name,
    date: new Date().toISOString().slice(0, 10),
    actPomodoros: task.actPomodoros,
    estPomodoros: task.estPomodoros,
  });
  return response.data["name"];
}
