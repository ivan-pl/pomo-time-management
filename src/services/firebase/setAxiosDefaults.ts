import axios from "axios";

export function setAxiosDefaults(
  url: string,
  uid: string,
  token: string,
): void {
  axios.defaults.baseURL = `${url}/users/${uid}`;
  axios.defaults.params = { auth: token };
}
