import {
  apiHandler,
} from "../components/Config/ApiHandler";
import {printApiErrors} from "../components/Config/HelperUtils";


export const fetchCourses = async () => {
  try {
    const {data} = await apiHandler.GET("courses")
    return data.data
  }catch (error){
    printApiErrors(error)
  }
}

export const fetchCourseById = async (courseId) => {
  try {
    const {data} = await apiHandler.GET("courses", `/${courseId}`)
    return data.data
  }catch (error){
    printApiErrors(error)
  }
}

const processCourseData = (postData, youtubeVideos, customVideos) => {
  const formData = new FormData();
  for(let item in postData){
    formData.append(item, postData[item])
  }
  if(customVideos){
    let i = 0;
    for(let item of customVideos){
      formData.append(`videoInfos[${i}][fileName]`, item.video.name)
      formData.append(`videoInfos[${i}][title]`, item.title)
      formData.append(`videoInfos[${i}][description]`, item.description)
      formData.append("videos", item.video)
      i++;
    }

  }
  if (youtubeVideos.length > 0) {
    for (let i = 0; i < youtubeVideos.length; i++) {
      formData.append(
          `youtubeVideos[${i}][thumbnail]`,
          youtubeVideos[i].thumbnail
      );
      formData.append(
          `youtubeVideos[${i}][publishedAt]`,
          youtubeVideos[i].publishedAt
      );
      formData.append(
          `youtubeVideos[${i}][title]`,
          youtubeVideos[i].title
      );
      formData.append(
          `youtubeVideos[${i}][url]`,
          youtubeVideos[i].videoId || youtubeVideos[i].url
      );
      formData.append(
          `youtubeVideos[${i}][description]`,
          youtubeVideos[i].description
      );
      formData.append(
          `youtubeVideos[${i}][length]`,
          youtubeVideos[i].length
      );
    }
  }
  if(postData.categoryId){
    for(const element of postData.categoryId) {
      formData.append('categoryId[]', element)
    }
    formData.delete("categoryId")
  }
  return formData
}

export const updateCourseById = async (postData, id, youtubeVideos = [], customVideos = undefined) => {
  try {
    const formData = processCourseData(postData,youtubeVideos, customVideos)
    const {data} = await apiHandler.PUT("courses", id, formData)
    return data
  }catch (error){
    printApiErrors(error)
  }
}

export const addCourse = async (postData, youtubeVideos = [], customVideos = undefined) => {
  try {
    const formData = processCourseData(postData, youtubeVideos, customVideos)
    const {data} = await apiHandler.POST("courses", formData)
    return data
  }catch (error){
    printApiErrors(error)
  }
}

export const removeCustomVideoById = async (id, filename) => {
  try {
    await apiHandler.POST("removeCustomVideo", {filename}, id)
  }catch (error){
    printApiErrors(error)
  }
};
