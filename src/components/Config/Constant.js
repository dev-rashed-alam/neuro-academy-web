const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const dateFormat = process.env.REACT_APP_DATE_FORMAT;
const youtubeUrl = process.env.REACT_APP_YOUTUBE_API_URL;
const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

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
    userByUserType: `${API_BASE_URL}/users/user-type`,
};


export {dateFormat, youtubeUrl, youtubeApiKey, apiEndPoints};
