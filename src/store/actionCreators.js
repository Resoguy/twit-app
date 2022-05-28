import { SET_TOKEN, SET_USER } from './types';
import axios from 'axios';

export const setTokenAction = token => ({ type: SET_TOKEN, payload: token });
export const setUserAction = user => ({ type: SET_USER, payload: user });

export const loginAction = loginData => async dispatch => {
	const { data } = await axios.post('http://localhost:1337/api/auth/local', loginData);

	localStorage.setItem('jwt', data.jwt);
	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
};

export const registerAction = registerData => async dispatch => {
	const { data } = await axios.post('http://localhost:1337/api/auth/local/register', registerData);

	localStorage.setItem('jwt', data.jwt);
	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
};

export const checkLoginAction = () => async dispatch => {
	const token = localStorage.getItem('jwt');

	if (!token) return;

	const { data } = await axios.get('http://localhost:1337/api/users/me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	dispatch(setTokenAction(token));
	dispatch(setUserAction(data));
};

export const logoutAction = () => dispatch => {
	localStorage.removeItem('jwt');

	dispatch(setTokenAction(null));
	dispatch(setUserAction(null));
};
