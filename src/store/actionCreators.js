import { SET_TOKEN, SET_USER } from './types';
import axios from 'axios';

export const setTokenAction = token => ({ type: SET_TOKEN, payload: token });
export const setUserAction = user => ({ type: SET_USER, payload: user });

export const loginAction = loginData => async dispatch => {
	const { data } = await axios.post('http://localhost:1337/api/auth/local', loginData);

	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
};

export const registerAction = registerData => async dispatch => {
	const { data } = await axios.post('http://localhost:1337/api/auth/local/register', registerData);

	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
};
