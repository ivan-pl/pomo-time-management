import axios from "axios";
import { RootState } from "../../app/store";

export async function getSettings(): Promise<RootState["settings"] | null> {
  const response = await axios.get("/settings.json");
  return response.data;
}
