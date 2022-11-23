import { apiUrl, postWithFromData } from "../components/Config/ApiHandler";

export const addCourse = (inputData, tutorials, youtubeVideos, id) => {
  let postData = { ...inputData };
  postData["image"] = inputData.image;
  postData["type"] = inputData.type.value;
  postData["title"] = inputData.title;
  postData["shortTitle"] = inputData.title;
  postData["category"] = inputData.category.map((item) => item.value);
  postData["customVideos"] = [...tutorials];
  postData["youtubeVideos"] = JSON.stringify([...youtubeVideos]);
  if (inputData.type.value !== "youtube") {
    delete postData["youtubeVideos"];
  } else {
    delete postData["customVideos"];
  }
  let url = id ? `${apiUrl.courseStore}/${id}` : apiUrl.courseStore;
  return postWithFromData(url, postData);
};
