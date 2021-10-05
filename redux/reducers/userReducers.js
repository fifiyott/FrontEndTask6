import {
    GET_USERS,
    USERS_ERROR,
  } from "./types";

  const initialState = {
    users: [],
    user: {},
    loading: true,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
        
      case GET_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false,
        };

      case USERS_ERROR:
        return {
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  }