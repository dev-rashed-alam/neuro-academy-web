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

const deleteMethod = (urlSegment, postData) => {
  return new Promise(async (resolve, reject) => {
    let url = backendServerUrl + urlSegment;
    await axios
      .delete(url, {
        headers: { Authorization: getToken() },
        data: postData,
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

  if (postData.customVideos) {
    for (let i = 0; i < postData.customVideos.length; i++) {
      formData.append(
        `customVideos[${i}][title]`,
        postData.customVideos[i].title
      );
      formData.append(
        `customVideos[${i}][video]`,
        postData.customVideos[i].video
      );
      formData.append(
        `customVideos[${i}][serial]`,
        postData.customVideos[i].serial
      );
    }
  }

  let url = backendServerUrl + urlSegment;
  return axios.post(url, formData, {
    headers: {
      Authorization: getToken(),
      Accept: "application/json",
    },
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

export {
  getMethod,
  postMethod,
  deleteMethod,
  fetchYoutubePlaylist,
  apiUrl,
  postWithFromData,
};
