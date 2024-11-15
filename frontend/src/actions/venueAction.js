import axios from "axios";
import { ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,NEW_REVIEW_REQUEST,NEW_REVIEW_FAIL,NEW_REVIEW_SUCCESS,ALL_VENUE_FAIL, ALL_VENUE_REQUEST, ALL_VENUE_SUCCESS, VENUE_DETAILS_FAIL, VENUE_DETAILS_REQUEST, VENUE_DETAILS_SUCCESS,ADMIN_VENUE_REQUEST,ADMIN_VENUE_FAIL,ADMIN_VENUE_SUCCESS, CLEAR_ERRORS, MANAGER_VENUE_REQUEST, MANAGER_VENUE_SUCCESS, MANAGER_VENUE_FAIL, CREATE_VENUE_REQUEST, CREATE_VENUE_SUCCESS, CREATE_VENUE_FAIL, UPDATE_VENUE_REQUEST, UPDATE_VENUE_SUCCESS, UPDATE_VENUE_FAIL, DELETE_VENUE_REQUEST, DELETE_VENUE_SUCCESS, DELETE_VENUE_FAIL } from "../consants/venueConsants";

export const getVenue = (keyword="",currentPage=1)  => async( dispatch ) => {
    try{

        dispatch({ type : ALL_VENUE_REQUEST });

        let link = `/api/v1/venues?keyword=${keyword}&page=${currentPage}`;

        const { data } = await axios.get(link);
        dispatch({
            type: ALL_VENUE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: ALL_VENUE_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getVenueDetails = (id) => async( dispatch ) => {
    try{
        dispatch({ type : VENUE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/venues/${id}`);

        dispatch({
            type: VENUE_DETAILS_SUCCESS,
            payload:data.venue
        })
    }catch(error){
        dispatch({
            type: VENUE_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteVenue = (id) => async( dispatch ) => {
  try {
    dispatch({ type: DELETE_VENUE_REQUEST });

    const { data } = await axios.delete(`/api/v1/venue/${id}`);

    dispatch({
      type: DELETE_VENUE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VENUE_FAIL,
      payload: error.response.data.message,
    });
  }
}
export const updateVenue = (id,venueData) => async( dispatch ) => {
  try {
    dispatch({ type: UPDATE_VENUE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/venue/${id}`, venueData, config);

    dispatch({
      type: UPDATE_VENUE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_VENUE_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const getAdminVenue = (id) => async( dispatch ) => {
    try {
        dispatch({ type: ADMIN_VENUE_REQUEST });
    
        const { data } = await axios.get("/api/v1/admin/venues");
      
        dispatch({
          type: ADMIN_VENUE_SUCCESS,
          payload: data.venues,
        });
      } catch (error) {
        dispatch({
          type: ADMIN_VENUE_FAIL,
          payload: error.response.data.message,
        });
      }
}

export const getManagerVenue = (id) => async( dispatch ) => {
    try {
        dispatch({ type: MANAGER_VENUE_REQUEST });
    
        const { data } = await axios.get("/api/v1/manager/venue");
      
        dispatch({
          type: MANAGER_VENUE_SUCCESS,
          payload: data.venues,
        });
      } catch (error) {
        dispatch({
          type: MANAGER_VENUE_FAIL,
          payload: error.response.data.message,
        });
      }
}

export const creatUpdateVenue = (myForm) => async(dispatch) => {
  try {
    dispatch({ type: CREATE_VENUE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/venue/new`,
      myForm,
      config
    );

    dispatch({
      type: CREATE_VENUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_VENUE_FAIL,
      payload: error.response.data.message,
    });
  }
}

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a venue
export const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};



//clearing errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({ type:CLEAR_ERRORS });
}
