const setUserSession = (loggedInInfo) => {
  localStorage.setItem("token", loggedInInfo.token);
  localStorage.setItem("userName", loggedInInfo.name);
  localStorage.setItem("userId", loggedInInfo.id);
  localStorage.setItem("userEmail", loggedInInfo.email);
  localStorage.setItem("image", loggedInInfo.image);
};

const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("image");
};

const getToken = () => {
  return localStorage.getItem("token") || null;
};

const getUser = () => {
  return localStorage.getItem("userName") || null;
};

const getUserId = () => {
  return localStorage.getItem("userId") || null;
};

const getUserImage = () => {
  return localStorage.getItem("image") || null;
};

export {
  setUserSession,
  removeUserSession,
  getToken,
  getUser,
  getUserId,
  getUserImage,
};
