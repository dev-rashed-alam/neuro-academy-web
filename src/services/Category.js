import {printApiErrors} from "../components/Config/HelperUtils";
import {apiHandler} from "../components/Config/ApiHandler";

export const addCategory = async (postData) => {
    try {
        const {data} = await apiHandler.POST("category", postData)
        return data
    }catch (error){
        printApiErrors(error)
    }
}

export const updateCategoryById = async (postData, id) => {
    try {
        const {data} = await apiHandler.PUT("category", id, postData)
        return data
    }catch (error){
        printApiErrors(error)
    }
}

export const findAllCategories = async () => {
    try {
        const {data} = await apiHandler.GET("findAllCategories")
        return data.data
    }catch (error){
        printApiErrors(error)
    }
}