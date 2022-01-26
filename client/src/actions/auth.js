// import api from '../utils/api';
import {
  LOGIN_SUCCESS,
  LOGOUT
} from './types';

// Login User
export const login = (address) => async dispatch => {
	console.log(address);
	dispatch({
		type: LOGIN_SUCCESS,
		payload: address
	});
};

// Logout
export const logout = () => ({ type: LOGOUT });
