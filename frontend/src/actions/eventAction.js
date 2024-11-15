import {
    ALL_EVENTS_REQUEST,
    ALL_EVENTS_SUCCESS,
    ALL_EVENTS_FAIL,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,
    MY_EVENTS_REQUEST, 
    MY_EVENTS_SUCCESS, 
    MY_EVENTS_FAIL, 
    CREATE_EVENT_FAIL, 
    CREATE_EVENT_REQUEST, 
    CREATE_EVENT_SUCCESS, 
    CLEAR_ERRORS,
    MANAGER_EVENTS_REQUEST,
    MANAGER_EVENTS_SUCCESS,
    MANAGER_EVENTS_FAIL
} from "../consants/eventConstants";
import axios from "axios";

//crate EVENT
export const newEvent = (event) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_EVENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("/api/v1/event/new", event, config);

        dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: CREATE_EVENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//get user events
export const myEvents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_EVENTS_REQUEST });

        const { data } = await axios.get("/api/v1/my/event");

        dispatch({ type: MY_EVENTS_SUCCESS, payload: data.events });
    } catch (error) {
        dispatch({
            type: MY_EVENTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All EVENTs (admin)
export const getAllEvents = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_EVENTS_REQUEST });

        const { data } = await axios.get("/api/v1/events");

        dispatch({ type: ALL_EVENTS_SUCCESS, payload: data });

        //dispatch({ type: ALL_EVENTS_SUCCESS, payload: data.events });
    } catch (error) {
        dispatch({
            type: ALL_EVENTS_FAIL,
            payload: error.response.data.message,
        });
    }
};  

export const getManagerEvent = () => async( dispatch ) => {
    try {
        dispatch({ type: MANAGER_EVENTS_REQUEST });
    
        const { data } = await axios.get("/api/v1/my/event/manager");
      
        dispatch({
          type: MANAGER_EVENTS_SUCCESS,
          payload: data.events,
        });
      } catch (error) {
        dispatch({
          type: MANAGER_EVENTS_FAIL,
          payload: error.response.data.message,
        });
      }
} 

// Update EVENT
export const updateEvent = (id, event) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EVENT_REQUEST });

        const config = {
            headers: {  
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `/api/v1/event/update/${id}`,
            event,
            config
        );

        dispatch({
            type: UPDATE_EVENT_SUCCESS,
            payload: data.success,
          });
        } catch (error) {
          dispatch({
            type: UPDATE_EVENT_FAIL,
            payload: error.response.data.message,
          });
        }
};

// Delete EVENT
export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EVENT_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/event/${id}`);

        dispatch({ type: DELETE_EVENT_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: DELETE_EVENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get EVENT Details
export const getEventDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: EVENT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/event/${id}`);

        dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data.event });
    } catch (error) {
        dispatch({
            type: EVENT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
