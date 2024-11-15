import axios from "axios";
import {
  CLEAR_ERRORS,
  VENUE_CAT_DETAILS_REQUEST,
  VENUE_CAT_DETAILS_SUCCESS,
  VENUE_CAT_DETAILS_FAIL,
  CREATE_CATERER_FAIL,
  CREATE_CATERER_REQUEST,
  CREATE_CATERER_SUCCESS,
  DELETE_CATERER_FAIL,
  DELETE_CATERER_REQUEST,
  DELETE_CATERER_SUCCESS,
  UPDATE_CATERER_FAIL,
  UPDATE_CATERER_REQUEST,
  UPDATE_CATERER_SUCCESS,
  ALL_CATERER_FAIL,
  ALL_CATERER_REQUEST,
  ALL_CATERER_SUCCESS,
  MANAGER_CATERER_FAIL,
  MANAGER_CATERER_REQUEST,
  MANAGER_CATERER_SUCCESS,
  CATERER_DETAILS_REQUEST,
  CATERER_DETAILS_SUCCESS,
  CATERER_DETAILS_FAIL,
} from "../consants/catererConstants";

export const createCaterer = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATERER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/caterer/new`,
      myForm,
      config
    );

    dispatch({
      type: CREATE_CATERER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATERER_FAIL,
      payload: error.response.data.message,
    });
  }
} 

export const deleteCaterer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATERER_REQUEST });

    const { data } = await axios.delete(`/api/v1/caterer/${id}`);

    dispatch({
      type: DELETE_CATERER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATERER_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const updateCaterer = (id, catererData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATERER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/caterer/${id}`, catererData, config);

    dispatch({
      type: UPDATE_CATERER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATERER_FAIL,
      payload: error.response.data.message,
    });
  }
}
export const getManagerCaterer = () => async (dispatch) => {
  try {
    dispatch({ type: MANAGER_CATERER_REQUEST });

    const { data } = await axios.get("/api/v1/caterers");

    dispatch({
      type: MANAGER_CATERER_SUCCESS,
      payload: data.caterers,
    });
  } catch (error) {
    dispatch({
      type: MANAGER_CATERER_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const getCatererDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATERER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/caterer/${id}`);

    dispatch({
      type: CATERER_DETAILS_SUCCESS,
      payload: data.caterer,
    });
  } catch (error) {
    dispatch({
      type: CATERER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const getCaterer = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATERER_REQUEST });

    const { data } = await axios.get(`/api/v1/caterer`);

    dispatch({
      type: ALL_CATERER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_CATERER_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getCatererByManId = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENUE_CAT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/cat/${id}`);

    dispatch({
      type: VENUE_CAT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: VENUE_CAT_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}