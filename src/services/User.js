import {apiHandler} from "../components/Config/ApiHandler";
import {printApiErrors} from "../components/Config/HelperUtils";

export const findAllUsersByUserType = async () => {
    try {
        const {data} = await apiHandler.GET("userByUserType", '/student')
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}

export const updateUserStatusById = async (postData, id) => {
    try {
        const {data} = await apiHandler.PUT("userById", `${id}/status`, postData)
        return data
    } catch (error) {
        printApiErrors(error)
    }
}