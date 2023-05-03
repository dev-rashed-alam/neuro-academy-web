import {printApiErrors} from "../components/Config/HelperUtils";
import {apiHandler} from "../components/Config/ApiHandler";

export const addArticle = async (postData) => {
    try {
        const formData = new FormData();
        for(let item in postData){
            formData.append(item, postData[item])
        }
        const {data} = await apiHandler.POST("article", formData)
        return data
    }catch (error){
        printApiErrors(error)
    }
}

export const updateArticleById = async (postData, id) => {
    try {
        const formData = new FormData();
        for(let item in postData){
            formData.append(item, postData[item])
        }
        const {data} = await apiHandler.PUT("article", id, formData)
        return data
    }catch (error){
        printApiErrors(error)
    }
}

export const findAllArticles = async () => {
    try {
        const {data} = await apiHandler.GET("findAllArticles")
        return data.data
    }catch (error){
        printApiErrors(error)
    }
}