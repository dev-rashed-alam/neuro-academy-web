import {
    apiHandler,
} from "../components/Config/ApiHandler";
import {generateRandomNumber, printApiErrors} from "../components/Config/HelperUtils";
import {youtubeApiKey, youtubeUrl} from "../components/Config/Constant";
import axios from "axios";


export const fetchCourses = async () => {
    try {
        const {data} = await apiHandler.GET("courses")
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}

export const fetchCourseById = async (courseId) => {
    try {
        const {data} = await apiHandler.GET("courses", `/${courseId}`)
        return data.data
    } catch (error) {
        printApiErrors(error)
    }
}

const processCourseData = (postData, youtubeVideos, customVideos, attachments) => {
    const formData = new FormData();
    for (let item in postData) {
        formData.append(item, postData[item])
    }
    if (customVideos) {
        let i = 0;
        for (let item of customVideos) {
            let fileName = generateRandomNumber() + "_" + item.video.name;
            const newFile = new File([item.video], fileName, {type: item.video.type});
            formData.append(`videoInfos[${i}][fileName]`, newFile.name)
            formData.append(`videoInfos[${i}][title]`, item.title)
            formData.append(`videoInfos[${i}][description]`, item.description)
            formData.append("videos", newFile)
            i++;
        }
    }
    if (attachments) {
        let i = 0;
        for (let item of attachments) {
            let fileName = generateRandomNumber() + "_" + item.file.name;
            const newFile = new File([item.file], fileName, {type: item.file.type});
            formData.append(`materialInfos[${i}][fileName]`, newFile.name)
            formData.append(`materialInfos[${i}][title]`, item.title)
            formData.append(`materialInfos[${i}][description]`, item.description)
            formData.append("materials", newFile)
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
    if (postData.categoryId) {
        for (const element of postData.categoryId) {
            formData.append('categoryId[]', element)
        }
        formData.delete("categoryId")
    }
    return formData
}

export const updateCourseById = async (postData, id, youtubeVideos = [], customVideos = undefined, attachments = undefined) => {
    try {
        const formData = processCourseData(postData, youtubeVideos, customVideos, attachments)
        const {data} = await apiHandler.PUT("courses", id, formData)
        return data
    } catch (error) {
        printApiErrors(error)
    }
}

export const addCourse = async (postData, youtubeVideos = [], customVideos = undefined, attachments = undefined) => {
    try {
        const formData = processCourseData(postData, youtubeVideos, customVideos, attachments)
        const {data} = await apiHandler.POST("courses", formData)
        return data
    } catch (error) {
        printApiErrors(error)
    }
}

export const removeCustomVideoById = async (id, filename) => {
    try {
        await apiHandler.POST("removeCustomVideo", {filename}, id)
    } catch (error) {
        printApiErrors(error)
    }
};

export const removeMaterialById = async (id, postData) => {
    try {
        await apiHandler.POST("removeCourseMaterial", postData, id)
    } catch (error) {
        printApiErrors(error)
    }
};

export const fetchYoutubePlaylist = (playListId, urlSegment) => {
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
