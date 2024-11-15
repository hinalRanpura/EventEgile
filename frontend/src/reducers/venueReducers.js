import {
  DELETE_VENUE_FAIL,
  DELETE_VENUE_REQUEST,
  DELETE_VENUE_RESET,
  DELETE_VENUE_SUCCESS,
  UPDATE_VENUE_FAIL,
  UPDATE_VENUE_REQUEST,
  UPDATE_VENUE_RESET,
  UPDATE_VENUE_SUCCESS,
  ADMIN_VENUE_FAIL,
  ADMIN_VENUE_REQUEST,
  ADMIN_VENUE_SUCCESS,
  ALL_VENUE_FAIL,
  ALL_VENUE_REQUEST,
  ALL_VENUE_SUCCESS,
  CLEAR_ERRORS,
  VENUE_DETAILS_FAIL,
  VENUE_DETAILS_REQUEST,
  VENUE_DETAILS_SUCCESS,
  MANAGER_VENUE_FAIL,
  MANAGER_VENUE_REQUEST,
  MANAGER_VENUE_SUCCESS,
  CREATE_VENUE_REQUEST,
  CREATE_VENUE_SUCCESS,
  CREATE_VENUE_FAIL,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
} from "../consants/venueConsants";
export const venueReducer = (state = { venues: [] }, action) => {
  switch (action.type) {
    case ALL_VENUE_REQUEST:
    case ADMIN_VENUE_REQUEST:
    case MANAGER_VENUE_REQUEST:
      return {
        loading: true,
        venues: []
      }
    case ALL_VENUE_SUCCESS:
      return {
        loading: false,
        venues: action.payload.venues,
        venueCount: action.payload.venueCount,
        resultPerPage: action.payload.resultPerPage
      }
    case ADMIN_VENUE_SUCCESS:
    case MANAGER_VENUE_SUCCESS:
      return {
        loading: false,
        venues: action.payload,
      }
    case ALL_VENUE_FAIL:
    case ADMIN_VENUE_FAIL:
    case MANAGER_VENUE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
};

export const venueDetailsReducer = (state = { venue: {} }, action) => {
  switch (action.type) {
    case VENUE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case VENUE_DETAILS_SUCCESS:
      return {
        loading: false,
        venue: action.payload,
      }
    case VENUE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
};

export const newVenueReducer = (state = { venue: {} }, action) => {
  switch (action.type) {
    case CREATE_VENUE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_VENUE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        venue: action.payload.venue
      };
    case CREATE_VENUE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_VENUE_FAIL:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const venuesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VENUE_REQUEST:
    case UPDATE_VENUE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_VENUE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_VENUE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_VENUE_FAIL:
    case UPDATE_VENUE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_VENUE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_VENUE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {  }, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const venueReviewssReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
