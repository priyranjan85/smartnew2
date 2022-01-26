import {
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/types';

const initialState = {
  address:null,
  isAuthenticated: null,
  loading: true,
  user: null
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        address: payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        address: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}

export default authReducer;
