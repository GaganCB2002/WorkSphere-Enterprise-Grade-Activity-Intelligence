import { combineReducers } from '@reduxjs/toolkit';

const initialAuthState = { isAuthenticated: false, user: null, loading: false, error: null };
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload, loading: false };
    case 'LOGOUT':
      return initialAuthState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
