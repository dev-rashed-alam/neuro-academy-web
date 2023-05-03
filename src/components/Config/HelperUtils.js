import { backendServerUrl } from "./Constant";
import { toast } from "react-toastify";
import moment from "moment";

const generatePagination = (data) => {
  return {
    totalPage: data.last_page,
    currentPage: data.current_page,
    nextPageUrl: removeDomainAddressFromPagination(data.next_page_url),
    previousPageUrl: removeDomainAddressFromPagination(data.prev_page_url),
    lastPageUrl: removeDomainAddressFromPagination(data.last_page_url),
    firstPageUrl: removeDomainAddressFromPagination(data.first_page_url),
  };
};

const removeDomainAddressFromPagination = (data) => {
  if (data && data.indexOf(backendServerUrl) !== -1) {
    return data.split(backendServerUrl)[1];
  } else {
    return data;
  }
};

const printApiErrors = (error) => {
  if (error && error?.response?.data?.errors) {
    let data = [];
    if(error.response.data.errors?.common){
      data.push(error.response.data.errors.common)
    }
    if(error.response.data.errors?.thumbnail){
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
  return Math.abs(Math.random() * 1000000 + 1);
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

export {
  generatePagination,
  removeDomainAddressFromPagination,
  printApiErrors,
  formatDate,
  generateRandomNumber,
  processDateForPost,
  convertDateToLocal,
  getErrorMessages,
  capitalizeFirstLetter,
  filterPostData,
  convertNumberToUSFormat,
};
