import axios from "axios";

export async function isCredentialsValid(): Promise<Boolean> {
  const response = await axios.get("/metadata.json");
  return response.status === 200;
}
