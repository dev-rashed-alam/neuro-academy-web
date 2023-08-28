import axios from "axios";
import {backendServerUrl, youtubeUrl, youtubeApiKey, apiEndPoints} from "./Constant";
import {getToken} from "./SessionUtils";

axios.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const getMethod = (urlSegment) => {
    return new Promise(async (resolve, reject) => {
        let url = backendServerUrl + urlSegment;
        await axios
            .get(url, {
                headers: {Authorization: getToken()},
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const postMethod = (urlSegment, postData) => {
    return new Promise(async (resolve, reject) => {
        let url = backendServerUrl + urlSegment;
        await axios
            .post(url, postData, {
                headers: {Authorization: getToken()},
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const fetchYoutubePlaylist = (playListId, urlSegment) => {
    return new Promise((resolve, reject) => {
        let url;
        if (urlSegment !== undefined) {
            url =
                youtubeUrl +
                "/playlistItems?part=snippet&playlistId=" +
                playListId +
                "&maxResults=50&key=" +
                youtubeApiKey +
                "&pageToken=" +
                urlSegment;
        } else {
            url =
                youtubeUrl +
                "/playlistItems?part=snippet&playlistId=" +
                playListId +
                "&maxResults=50&key=" +
                youtubeApiKey;
        }
        axios
            .get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => reject(error));
    });
};

const apiUrl = {
    courseList: "/admin/courses",
    courseStore: "/admin/courses",
    removeCustomVideo: "/admin/courses/videos/delete",
    categoryList: "/admin/categories",
    getUserInfo: "/admin/users/",
    getDashboardReportCounts: "/admin/dashboard",
    getNotifications: "/admin/notifications",
};

const getAxiosReqConfig = () => {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`
    };
}


const apiHandler = {
    GET: (endPointKey, queryParams = '') => {
        let headers = getAxiosReqConfig()
        return axios.get(apiEndPoints[endPointKey] + queryParams, {
            headers
        });
    },
    POST: (endPointKey, requestBody, id) => {
        let headers = getAxiosReqConfig()
        let url = id ? apiEndPoints[endPointKey] + `/${id}` : apiEndPoints[endPointKey]
        return axios.post(url, requestBody, {
            headers
        });
    },
    PUT: (endPointKey, id, requestBody) => {
        let headers = getAxiosReqConfig()
        return axios.put(apiEndPoints[endPointKey] + `/${id}`, requestBody, {
            headers
        });
    },
    DELETE: (endPointKey, id) => {
        let headers = getAxiosReqConfig()
        return axios.delete(apiEndPoints[endPointKey] + `/${id}`, {
            headers
        });
    }
}

export {
    getMethod,
    postMethod,
    fetchYoutubePlaylist,
    apiUrl,
    apiHandler
};
