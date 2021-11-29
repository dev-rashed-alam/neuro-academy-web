const generatePagination = (data) => {
    console.log(data)
    return {
        totalPage: data.total,
        currentPage: data.current_page,
        nextPageUrl: data.next_page_url,
        previousPageUrl: data.prev_page_url,
        lastPageUrl: data.last_page_url,
        firstPageUrl: data.first_page_url,
    }
}

export {
    generatePagination
}