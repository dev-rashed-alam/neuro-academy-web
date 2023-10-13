import {toast} from "react-toastify";
import moment from "moment";

const printApiErrors = (error) => {
    const errors = error?.response?.data?.errors;
    if (errors) {
        let data = [];
        if (error.response.data.errors?.common) {
            data.push(error.response.data.errors.common)
        }
        if (error.response.data.errors?.thumbnail) {
            data.push(error.response.data.errors.thumbnail)
        }
        for (let item of data) {
            toast.error(item.msg);
        }
    } else if (error) {
        toast.error(error.message);
    }
};

const formatDate = (date) => {
    if (date) {
        return convertDateToLocal(date.split("T")[0], "MMM DD, YYYY");
    } else {
        return "";
    }
};

const generateRandomNumber = () => {
    return Math.ceil(Math.abs(Math.random() * 10000000 + 1));
};

const processDateForPost = (date) => {
    if (date === undefined) return;
    let postDate = new Date(date);
    return postDate.toISOString().substr(0, 19).replace("T", " ");
};

const convertDateToLocal = (date, outputFormat = "DD.MM.YYYY") => {
    return moment.utc(date).local().format(outputFormat);
};

const getErrorMessages = (err) => {
    let errorObj = {};
    for (let item of err.inner) {
        errorObj[item.path] = item.message;
    }
    return errorObj;
};

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const filterPostData = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null && v !== "")
    );
};

const convertNumberToUSFormat = (value, removeFloating = true) => {
    if (!value) return 0;
    let formatter;
    if (removeFloating) {
        formatter = new Intl.NumberFormat("en-us");
        return formatter.format(Math.floor(value));
    } else {
        formatter = new Intl.NumberFormat("en-us", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formatter.format(value);
    }
};

const parseYoutubeVideoDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

const formatSecondsToDuration = (totalSeconds) => {
    if(!totalSeconds) return;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours} h, ${minutes} m, ${seconds} s`;
}

export {
    printApiErrors,
    formatDate,
    generateRandomNumber,
    processDateForPost,
    convertDateToLocal,
    getErrorMessages,
    capitalizeFirstLetter,
    filterPostData,
    convertNumberToUSFormat,
    parseYoutubeVideoDuration,
    formatSecondsToDuration
};
