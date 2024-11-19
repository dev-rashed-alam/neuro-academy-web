import {apiHandler} from "../components/Config/ApiHandler";
import {printApiErrors} from "../components/Config/HelperUtils";

export const findAllPurchase = async () => {
    try {
        const {data} = await apiHandler.GET("purchases", "?page=1&limit=1000")
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}
export const findPurchaseInfoById = async (purchaseId) => {
    try {
        const {data} = await apiHandler.GET("purchase", purchaseId)
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}