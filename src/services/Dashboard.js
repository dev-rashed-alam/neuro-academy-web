import { apiUrl, getMethod } from "../components/Config/ApiHandler";

export const fetchDashboardCount = () => {
  return getMethod(`${apiUrl.getDashboardReportCounts}`);
};
