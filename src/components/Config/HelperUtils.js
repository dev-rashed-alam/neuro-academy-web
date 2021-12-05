import {backendServerUrl} from "./Constant";
import {toast} from "react-toastify";

const generatePagination = (data) => {
    return {
        totalPage: data.last_page,
        currentPage: data.current_page,
        nextPageUrl: removeDomainAddressFromPagination(data.next_page_url),
        previousPageUrl: removeDomainAddressFromPagination(data.prev_page_url),
        lastPageUrl: removeDomainAddressFromPagination(data.last_page_url),
        firstPageUrl: removeDomainAddressFromPagination(data.first_page_url),
    }
}

const removeDomainAddressFromPagination = (data) => {
    if (data && data.indexOf(backendServerUrl) !== -1) {
        return data.split(backendServerUrl)[1]
    } else {
        return data;
    }
}

const printApiErrors = (error) => {
    if (error && error.response.data.error_type === "ValidationFailed") {
        let data = [...error.response.data.data];
        for (let item of data) {
            toast.error(item)
        }
    } else if (error) {
        toast.error(error.response.data.message)
    }
}

const formatDate = (date) => {
    if (date) {
        return date.split("T")[0]
    } else {
        return ""
    }
}

export {
    generatePagination,
    removeDomainAddressFromPagination,
    printApiErrors,
    formatDate
}