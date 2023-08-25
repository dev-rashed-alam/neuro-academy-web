const setUserSession = (loggedInInfo) => {
  localStorage.setItem("token", loggedInInfo.access_token);
  localStorage.setItem("userName", `${loggedInInfo.data.firstName} ${loggedInInfo.data.lastName}`);
  localStorage.setItem("userId", loggedInInfo.data.id);
  localStorage.setItem("userEmail", loggedInInfo.data.email);
  localStorage.setItem("avatar", loggedInInfo.data.avatar);
};

const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  localStorage.removeItem("avatar");
};

const getToken = () => {
  return localStorage.getItem("token") || null;
};

const getUser = () => {
  return localStorage.getItem("userName") || null;
};

const getUserEmail = () => {
  return localStorage.getItem("userEmail") || '';
};

const getUserId = () => {
  return localStorage.getItem("userId") || null;
};

const getUserImage = () => {
  return localStorage.getItem("avatar") || null;
};

export {
  setUserSession,
  removeUserSession,
  getToken,
  getUser,
  getUserId,
  getUserImage,
  getUserEmail
};
