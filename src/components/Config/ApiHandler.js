import axios from "axios";
import {backendServerUrl, youtubeUrl, youtubeApiKey} from "./Constant";
import {getToken} from "./SessionUtils";

const getMethod = (urlSegment) => {
    return new Promise((resolve, reject) => {
        let url = backendServerUrl + urlSegment
        axios.get(url, {
            headers: {Authorization: getToken(), id: 1},
        }).then(response => resolve(response)).catch(error => reject(error))
    })
};

const postMethod = (urlSegment, postData) => {
    return new Promise((resolve, reject) => {
        let url = backendServerUrl + urlSegment
        axios.post(url, postData, {
            headers: {Authorization: getToken()},
        }).then(response => resolve(response)).catch(error => reject(error))
    })
}

const uploadAttachment = (urlSegment, formData) => {
    let url = backendServerUrl + urlSegment;
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => resolve(response)).catch(error => reject(error))
    })
}

const fetchYoutubePlaylist = (playListId, urlSegment) => {
    console.log(urlSegment)
    return new Promise((resolve, reject) => {
        let url;
        if (urlSegment !== undefined) {
            url = youtubeUrl + "/playlistItems?part=snippet&playlistId=" + playListId + "&maxResults=50&key=" + youtubeApiKey + "&pageToken=" + urlSegment;
        } else {
            url = youtubeUrl + "/playlistItems?part=snippet&playlistId=" + playListId + "&maxResults=50&key=" + youtubeApiKey;
        }
        axios.get(url).then((response) => {
            resolve(response.data);
        }).catch(error => reject(error))
    })
}


export {
    getMethod,
    postMethod,
    uploadAttachment,
    fetchYoutubePlaylist
}