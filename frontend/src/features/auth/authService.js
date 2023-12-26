import axios from "axios";

// this url is the backend url, so we need to connect to port 5000 which is done by proxy
const API_URL = "/api/users/";

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = async () => {
  localStorage.removeItem("userInfo");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
