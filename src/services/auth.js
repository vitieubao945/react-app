import axios from "axios";

const API_URL = "http://streaming.nexlesoft.com:4000/api/auth/";

export const register = (firstName, lastName, email, password) => {
  return axios
    .post(API_URL + "signup", {
      firstName,
      lastName,
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = (token) => {
  return axios
    .get(API_URL + "logout", { headers: { Authorization: token } })
    .then(() => {
      localStorage.removeItem("user");
    });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
