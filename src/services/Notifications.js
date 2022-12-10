import { apiUrl, getMethod } from "../components/Config/ApiHandler";

export const fetchNotifications = () => {
  return getMethod(`${apiUrl.getNotifications}`);
};
