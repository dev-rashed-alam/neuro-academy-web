import axios from "axios";
import { backendServerUrl, youtubeUrl, youtubeApiKey } from "./Constant";
import { getToken } from "./SessionUtils";

const getMethod = (urlSegment) => {
  return new Promise(async (resolve, reject) => {
    let url = backendServerUrl + urlSegment;
    await axios
      .get(url, {
        headers: { Authorization: getToken() },
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
        headers: { Authorization: getToken() },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const postWithFromData = (urlSegment, postData) => {
  let formData = new FormData();
  for (let item in postData) {
    formData.append(item, postData[item]);
  }
  let url = backendServerUrl + urlSegment;
  return axios.post(url, formData, {
    headers: {
      Authorization: getToken(),
      Accept: "application/json",
    },
  });
};

const uploadAttachment = (urlSegment, formData) => {
  let url = backendServerUrl + urlSegment;
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
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
  categoryList: "/admin/categories",
};

export {
  getMethod,
  postMethod,
  uploadAttachment,
  fetchYoutubePlaylist,
  apiUrl,
  postWithFromData,
};
