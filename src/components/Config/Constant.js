let dateFormat = "dd-MM-yyyy";
// let dateFormat = "MM/dd/yyyy";
// let dateFormat = "yyyy/MM/dd";
let API_BASE_URL = "https://academy.neuro-soft.net";
// let API_BASE_URL = "http://localhost:5000";
let backendServerUrl = "https://www.api.neuro-soft.net";
let youtubeUrl = "https://www.googleapis.com/youtube/v3";
let youtubeApiKey = "AIzaSyDf60k7A9Jg54hGwLgw1Hx5wKiEuiGu1Ko";

const apiEndPoints = {
    login: `${API_BASE_URL}/login`,
    userById: `${API_BASE_URL}/users`,
    coupon: `${API_BASE_URL}/coupons`,
    findAllCategories: `${API_BASE_URL}/category/all`,
    category: `${API_BASE_URL}/category`,
    findAllArticles: `${API_BASE_URL}/article/all`,
    article: `${API_BASE_URL}/article`,
    courses: `${API_BASE_URL}/courses`,
    removeCustomVideo: `${API_BASE_URL}/courses/videos/remove`,
    removeCourseMaterial: `${API_BASE_URL}/courses/materials/remove`,
};


export { dateFormat, backendServerUrl, youtubeUrl, youtubeApiKey, apiEndPoints };
