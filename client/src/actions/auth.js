import {
  REGISTER,
  LOGIN_SUCCESS,
  USER_LOADED,
  EDIT_SUCCESS,
  EDIT_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  FAVORITE_MOVIE,
  DELETE_MOVIE,
} from "./type";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        dispatch({
          type: LOGIN_FAIL,
          payload: errors,
        });
      }
    }
  };

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: LOGIN_FAIL,
        payload: errors,
      });
    }
  }
};

export const editUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.put("/api/profile", body, config);
    dispatch({
      type: EDIT_SUCCESS,
      payload: { ...res.data, msg: "SUCCESS" },
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: EDIT_FAIL,
      payload: errors,
    });
  }
};

export const favoriteMovie =
  (original_title, poster_path, movieId) => async (dispatch) => {
    const movie = { original_title, poster_path, movieId };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(movie);
    try {
      const res = await axios.post("/api/auth/user/myMovies", body, config);
      dispatch({
        type: FAVORITE_MOVIE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteMovie = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/auth/user/myMovies/${id}`);
    console.log(res.data);
    dispatch({
      type: DELETE_MOVIE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// (original_title, poster_path, movieId) => async (dispatch) => {
//     const movie = { original_title, poster_path, movieId };
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const body = JSON.stringify(movie);
//     try {
//       const res = await axios.post("/api/auth/user/myMovies", body, config);
//       dispatch({
//         type: FAVORITE_MOVIE,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }

export const removeError = () => (dispatch) => {
  dispatch({
    type: EDIT_FAIL,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
