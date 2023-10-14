const dateFormat = "dd-MM-yyyy";
const API_BASE_URL = "https://academy.algomatrixs.com";
const youtubeUrl = "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = "AIzaSyDf60k7A9Jg54hGwLgw1Hx5wKiEuiGu1Ko";

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
    purchases: `${API_BASE_URL}/purchase/all`,
    purchase: `${API_BASE_URL}/purchase/`,
    dashboardCounts: `${API_BASE_URL}/dashboard/all-counts`,
    weeklyPurchaseReport: `${API_BASE_URL}/dashboard/purchase/report/this-week`,
    yearlyPurchaseReport: `${API_BASE_URL}/dashboard/purchase/report/this-year`,
};


export {dateFormat, youtubeUrl, youtubeApiKey, apiEndPoints};
