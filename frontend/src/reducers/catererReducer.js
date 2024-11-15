import {
  CREATE_CATERER_FAIL,
  CREATE_CATERER_REQUEST,
  CREATE_CATERER_SUCCESS,
  MANAGER_CATERER_FAIL,
  MANAGER_CATERER_REQUEST,
  MANAGER_CATERER_SUCCESS,
  UPDATE_CATERER_FAIL,
  UPDATE_CATERER_REQUEST,
  UPDATE_CATERER_SUCCESS,
  UPDATE_CATERER_RESET,
  ALL_CATERER_FAIL,
  ALL_CATERER_REQUEST,
  ALL_CATERER_SUCCESS,
  DELETE_CATERER_FAIL,
  DELETE_CATERER_REQUEST,
  DELETE_CATERER_SUCCESS,
  DELETE_CATERER_RESET,
  CLEAR_ERRORS,
  CATERER_DETAILS_FAIL,
  CATERER_DETAILS_SUCCESS,
  CATERER_DETAILS_REQUEST,
  VENUE_CAT_DETAILS_REQUEST,
  VENUE_CAT_DETAILS_FAIL,
  VENUE_CAT_DETAILS_SUCCESS,
} from "../consants/catererConstants"

export const newCatererReducer = (state = { caterer: {} }, action) => {
  switch (action.type) {
    case CREATE_CATERER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATERER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        caterer: action.payload.caterer
      };
    case CREATE_CATERER_FAIL:
      return {
        ...state,
        success: false,
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

export const catererReducer = (state = { caterers: [] }, action) => {
  switch (action.type) {
    case ALL_CATERER_REQUEST:
    case MANAGER_CATERER_REQUEST:
    case VENUE_CAT_DETAILS_REQUEST:
      return {
        loading: true,
        caterers: []
      }
    case ALL_CATERER_SUCCESS:
      return {
        loading: false,
        caterers: action.payload.caterers
      }
    case VENUE_CAT_DETAILS_SUCCESS:
      return {
        loading: false,
        caterers: action.payload.caterers
      }
    case MANAGER_CATERER_SUCCESS:
      return {
        loading: false,
        caterers: action.payload,
      }
    case ALL_CATERER_FAIL:
    case MANAGER_CATERER_FAIL:
    case VENUE_CAT_DETAILS_FAIL:
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

export const caterersReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATERER_REQUEST:
    case UPDATE_CATERER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATERER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_CATERER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_CATERER_FAIL:
    case UPDATE_CATERER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_CATERER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_CATERER_RESET:
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

export const catererDetailsReducer = (state = { caterer: {} }, action) => {
  switch (action.type) {
    case CATERER_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CATERER_DETAILS_SUCCESS:
      return {
        loading: false,
        caterer: action.payload,
      }
    case CATERER_DETAILS_FAIL:
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