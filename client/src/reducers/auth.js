import {
  REGISTER,
  LOGIN_SUCCESS,
  USER_LOADED,
  EDIT_SUCCESS,
  EDIT_FAIL,
  LOGOUT,
  LOGIN_FAIL,
  FAVORITE_MOVIE,
  DELETE_MOVIE,
} from "../actions/type";

const initial = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  msg: "",
  errors: [],
};

export default function auth(state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
    case FAVORITE_MOVIE:
    case DELETE_MOVIE:
      localStorage.getItem("token", payload.token);
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        errors: null,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        msg: payload.msg,
        errors: null,
      };

    case REGISTER:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case EDIT_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        msg: null,
        errors: payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
