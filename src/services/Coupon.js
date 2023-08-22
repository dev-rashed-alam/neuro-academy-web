import {apiHandler} from "../components/Config/ApiHandler";
import {printApiErrors} from "../components/Config/HelperUtils";

export const addCoupon = async (postData) => {
    try {
        const {data} = await apiHandler.POST("coupon", postData)
        return data
    } catch (error) {
        printApiErrors(error)
    }
}

export const updateCouponById = async (postData, id) => {
    try {
        const {data} = await apiHandler.PUT("coupon", id, postData)
        return data
    } catch (error) {
        printApiErrors(error)
    }
}

export const findAllCoupons = async () => {
    try {
        const {data} = await apiHandler.GET("coupon")
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}
