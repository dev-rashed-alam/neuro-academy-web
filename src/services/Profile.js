import {
    apiHandler,
} from "../components/Config/ApiHandler";
import {printApiErrors} from "../components/Config/HelperUtils";

export const fetchUserInfoById = async (id) => {
    try {
        const {data} = await apiHandler.GET('userById', `/${id}`);
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
};

export const updateProfileById = async (id, postData) => {
    try {
        const formData = new FormData();
        for (let item in postData) {
            formData.append(item, postData[item])
        }
        const {data} = await apiHandler.PUT('userById', `/${id}`, formData);
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
};

