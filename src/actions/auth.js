import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import AuthService from "../services/auth";

export const register =
  ({ firstName, lastName, email, password }) =>
  (dispatch) => {
    return AuthService.register(firstName, lastName, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      () => {
        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: "Registration failed",
        });

        return Promise.reject();
      }
    );
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        console.log("🚀 ~ file: auth.js ~ line 46 ~ data", dispatch);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      () => {
        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: "Login failed",
        });

        return Promise.reject();
      }
    );
  };

export const logout = (token) => (dispatch) => {
  AuthService.logout(token);

  localStorage.removeItem("user");

  dispatch({
    type: LOGOUT,
  });
};
