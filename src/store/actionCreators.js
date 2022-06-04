import { SET_TOKEN, SET_USER, SET_TWITS } from './types';
import api from '../api';

export const setTokenAction = token => ({ type: SET_TOKEN, payload: token });
export const setUserAction = user => ({ type: SET_USER, payload: user });

export const loginAction = loginData => async dispatch => {
	const { data } = await api.post('/auth/local', loginData);

	localStorage.setItem('jwt', data.jwt);
	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
};

export const registerAction = registerData => async dispatch => {
	const { data } = await api.post('/auth/local/register', registerData);

	localStorage.setItem('jwt', data.jwt);
	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
};

export const checkLoginAction = () => async dispatch => {
	const token = localStorage.getItem('jwt');

	if (!token) return;

	const { data } = await api.get('/users/me', {
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

export const setTwits = twits => ({ type: SET_TWITS, payload: twits });

export const fetchTwitsAction = () => async dispatch => {
	const { data } = await api.get('/twits?populate=*&sort[0]=createdAt:desc');

	dispatch(setTwits(data.data));
};

export const postTwitAction = twit => async dispatch => {
	const token = localStorage.getItem('jwt');

	if (!token) return;

	await api.post(
		'/twits',
		{ data: twit },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	dispatch(fetchTwitsAction());
};
