import {apiHandler} from "../components/Config/ApiHandler";
import {printApiErrors} from "../components/Config/HelperUtils";

export const fetchDashboardCounts = async () => {
    try {
        const {data} = await apiHandler.GET("dashboardCounts")
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}
export const fetchPurchaseReportWeekly = async () => {
    try {
        const {data} = await apiHandler.GET("weeklyPurchaseReport")
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}

export const fetchPurchaseReportMonthly = async () => {
    try {
        const {data} = await apiHandler.GET("yearlyPurchaseReport")
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}