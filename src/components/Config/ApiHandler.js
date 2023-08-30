import axios from "axios";
import {apiEndPoints} from "./Constant";
import {getToken} from "./SessionUtils";

axios.interceptors.request.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

const getAxiosReqConfig = () => {
    return {
        'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${getToken()}`
    };
}


const apiHandler = {
    GET: (endPointKey, queryParams = '') => {
        let headers = getAxiosReqConfig()
        return axios.get(apiEndPoints[endPointKey] + queryParams, {
            headers
        });
    }, POST: (endPointKey, requestBody, id) => {
        let headers = getAxiosReqConfig()
        let url = id ? apiEndPoints[endPointKey] + `/${id}` : apiEndPoints[endPointKey]
        return axios.post(url, requestBody, {
            headers
        });
    }, PUT: (endPointKey, id, requestBody) => {
        let headers = getAxiosReqConfig()
        return axios.put(apiEndPoints[endPointKey] + `/${id}`, requestBody, {
            headers
        });
    }, DELETE: (endPointKey, id) => {
        let headers = getAxiosReqConfig()
        return axios.delete(apiEndPoints[endPointKey] + `/${id}`, {
            headers
        });
    }
}

export {
    apiHandler
};
