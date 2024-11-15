import {
  CREATE_DECORATION_FAIL,
  CREATE_DECORATION_REQUEST,
  CREATE_DECORATION_SUCCESS,
  MANAGER_DECORATION_FAIL,
  MANAGER_DECORATION_REQUEST,
  MANAGER_DECORATION_SUCCESS,
  UPDATE_DECORATION_FAIL,
  UPDATE_DECORATION_REQUEST,
  UPDATE_DECORATION_SUCCESS,
  UPDATE_DECORATION_RESET,
  ALL_DECORATION_FAIL,
  ALL_DECORATION_REQUEST,
  ALL_DECORATION_SUCCESS,
  DELETE_DECORATION_FAIL,
  DELETE_DECORATION_REQUEST,
  DELETE_DECORATION_SUCCESS,
  DELETE_DECORATION_RESET,
  CLEAR_ERRORS,
  DECORATION_DETAILS_FAIL,
  DECORATION_DETAILS_SUCCESS,
  DECORATION_DETAILS_REQUEST,
  VENUE_DECORATION_DETAILS_SUCCESS,
  VENUE_DECORATION_DETAILS_REQUEST,
  VENUE_DECORATION_DETAILS_FAIL,
} from "../consants/decorationConstants"

export const newDecorationReducer = (state = { decoration: {} }, action) => {
  switch (action.type) {
    case CREATE_DECORATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DECORATION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        decoration: action.payload.decoration
      };
    case CREATE_DECORATION_FAIL:
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

export const decorationReducer = (state = { decorations: [] }, action) => {
  switch (action.type) {
    case ALL_DECORATION_REQUEST:
    case MANAGER_DECORATION_REQUEST:
    case VENUE_DECORATION_DETAILS_REQUEST:
      return {
        loading: true,
        decorations: []
      }
    case ALL_DECORATION_SUCCESS:
      return {
        loading: false,
        decorations: action.payload.decorations
      }
    case VENUE_DECORATION_DETAILS_SUCCESS:
      return {
        loading: false,
        decorations: action.payload.decorations
      }
    case MANAGER_DECORATION_SUCCESS:
      return {
        loading: false,
        decorations: action.payload,
      }
    case ALL_DECORATION_FAIL:
    case MANAGER_DECORATION_FAIL:
    case VENUE_DECORATION_DETAILS_FAIL:
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

export const decorationsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DECORATION_REQUEST:
    case UPDATE_DECORATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DECORATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_DECORATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DECORATION_FAIL:
    case UPDATE_DECORATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_DECORATION_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DECORATION_RESET:
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

export const decorationDetailsReducer = (state = { decoration: {} }, action) => {
  switch (action.type) {
    case DECORATION_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case DECORATION_DETAILS_SUCCESS:
      return {
        loading: false,
        decoration: action.payload,
      }
    case DECORATION_DETAILS_FAIL:
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