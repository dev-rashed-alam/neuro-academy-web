const setUserSession = (loggedInInfo) => {
    localStorage.setItem("token", loggedInInfo.token);
    localStorage.setItem("userName", loggedInInfo.name);
    localStorage.setItem("userEmail", loggedInInfo.email);
};

const removeUserSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
};

const getToken = () => {
    return localStorage.getItem("token") || null;
};

const getUser = () => {
    return localStorage.getItem("userName") || null;
};

export {
    setUserSession,
    removeUserSession,
    getToken,
    getUser
}