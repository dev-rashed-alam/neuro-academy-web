import { apiUrl, postWithFromData } from "../components/Config/ApiHandler";

export const addCourse = (inputData, tutorials, youtubeVideos) => {
  let postData = { ...inputData };
  postData["image"] = inputData.image;
  postData["type"] = inputData.type.value;
  postData["title"] = inputData.title;
  postData["shortTitle"] = inputData.title;
  postData["category"] = inputData.category.map((item) => item.value);
  postData["customVideos"] = JSON.stringify([...tutorials]);
  postData["youtubeVideos"] = JSON.stringify([...youtubeVideos]);
  if (inputData.type.value !== "youtube") {
    delete postData["youtubeVideos"];
  } else {
    delete postData["customVideos"];
  }
  console.log(postData);
  return postWithFromData(apiUrl.courseStore, postData);
};
