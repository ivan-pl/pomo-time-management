import axios from "axios";
import { RootState } from "../../app/store";

export async function setSettings(
  settings: RootState["settings"],
): Promise<boolean> {
  const response = await axios.put("/settings.json", { settings });
  return response.status === 200;
}
