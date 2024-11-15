import {
  ALL_EVENTS_REQUEST,
  ALL_EVENTS_SUCCESS,
  ALL_EVENTS_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_RESET,
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

export const newEventReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case CREATE_EVENT_SUCCESS:
      return {
        loading: false,
        event: action.payload,
      }
    case CREATE_EVENT_FAIL:
      return {
        loading: true,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export const myEventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case MY_EVENTS_REQUEST:
      return {
        loading: true,
      };

    case MY_EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      };

    case MY_EVENTS_FAIL:
      return {
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

export const allEventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case ALL_EVENTS_REQUEST:
    case MANAGER_EVENTS_REQUEST:
      return {
        loading: true,
      };
    case ALL_EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload.events
      }
    case MANAGER_EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      }
    case MANAGER_EVENTS_FAIL:
      return {
        loading: false,
        events: action.payload,
      };

    case ALL_EVENTS_FAIL:
      return {
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



export const eventDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case EVENT_DETAILS_SUCCESS:
      return {
        loading: false,
        event: action.payload,
      };

    case EVENT_DETAILS_FAIL:
      return {
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


export const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_EVENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_EVENT_RESET:
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