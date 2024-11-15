import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_DECORATION_FAIL,
  CREATE_DECORATION_REQUEST,
  CREATE_DECORATION_SUCCESS,
  DELETE_DECORATION_FAIL,
  DELETE_DECORATION_REQUEST,
  DELETE_DECORATION_SUCCESS,
  UPDATE_DECORATION_FAIL,  
  UPDATE_DECORATION_REQUEST,
  UPDATE_DECORATION_SUCCESS,
  ALL_DECORATION_FAIL,
  ALL_DECORATION_REQUEST,
  ALL_DECORATION_SUCCESS,
  MANAGER_DECORATION_FAIL,
  MANAGER_DECORATION_REQUEST,
  MANAGER_DECORATION_SUCCESS,
  VENUE_DECORATION_DETAILS_REQUEST,
  VENUE_DECORATION_DETAILS_SUCCESS,
  VENUE_DECORATION_DETAILS_FAIL,
  DECORATION_DETAILS_REQUEST,
  DECORATION_DETAILS_SUCCESS,
  DECORATION_DETAILS_FAIL,
} from "../consants/decorationConstants";

export const createDecoration = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DECORATION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/decoration/new`,
      myForm,
      config
    );

    dispatch({
      type: CREATE_DECORATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_DECORATION_FAIL,
      payload: error.response.data.message,
    });
  }
} 

export const deleteDecoration = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DECORATION_REQUEST });

    const { data } = await axios.delete(`/api/v1/decoration/${id}`);

    dispatch({
      type: DELETE_DECORATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DECORATION_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const updateDecoration = (id, decorationData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DECORATION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/decoration/${id}`, decorationData, config);

    dispatch({
      type: UPDATE_DECORATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DECORATION_FAIL,
      payload: error.response.data.message,
    });
  }
}
export const getManagerDecoration = () => async (dispatch) => {
  try {
    dispatch({ type: MANAGER_DECORATION_REQUEST });

    const { data } = await axios.get("/api/v1/decorations");

    dispatch({
      type: MANAGER_DECORATION_SUCCESS,
      payload: data.decorations,
    });
  } catch (error) {
    dispatch({
      type: MANAGER_DECORATION_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const getDecorationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DECORATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/decoration/${id}`);

    dispatch({
      type: DECORATION_DETAILS_SUCCESS,
      payload: data.decoration,
    });
  } catch (error) {
    dispatch({
      type: DECORATION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const getDecoration = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DECORATION_REQUEST });

    const { data } = await axios.get(`/api/v1/decoration`);

    dispatch({
      type: ALL_DECORATION_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_DECORATION_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getDecorationByManId = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENUE_DECORATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/deco/${id}`);

    dispatch({
      type: VENUE_DECORATION_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: VENUE_DECORATION_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}


//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}