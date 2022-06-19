import {
	SET_TOKEN,
	SET_USER,
	SET_TWITS,
	SET_TWITS_LIKED_BY_ME,
	SET_REPLIES_LIKED_BY_ME,
} from './types';
import api, { postReplyLike, deleteReplyLike, findReplyLike } from '../api';

export const setTokenAction = token => ({ type: SET_TOKEN, payload: token });
export const setUserAction = user => ({ type: SET_USER, payload: user });

export const loginAction = loginData => async dispatch => {
	const { data } = await api.post('/auth/local', loginData);

	localStorage.setItem('jwt', data.jwt);
	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
	dispatch(fetchLikedTwitsAction());
	dispatch(fetchLikedRepliesAction());
};

export const registerAction = registerData => async dispatch => {
	const { data } = await api.post('/auth/local/register', registerData);

	localStorage.setItem('jwt', data.jwt);
	dispatch(setTokenAction(data.jwt));
	dispatch(setUserAction(data.user));
};

export const fetchMeAction = () => async dispatch => {
	const token = localStorage.getItem('jwt');

	if (!token) return;

	const { data } = await api.get('/users/me');

	dispatch(setTokenAction(token));
	dispatch(setUserAction(data));
};

export const checkLoginAction = () => async dispatch => {
	await dispatch(fetchMeAction());

	await dispatch(fetchLikedTwitsAction());
	dispatch(fetchLikedRepliesAction());
};

export const logoutAction = () => dispatch => {
	localStorage.removeItem('jwt');

	dispatch(setTokenAction(null));
	dispatch(setUserAction(null));
	dispatch(setLikedTwitsAction(null));
	dispatch(setLikedRepliesAction(null));
};

export const setTwits = twits => ({ type: SET_TWITS, payload: twits });

export const fetchTwitsAction = () => async dispatch => {
	const { data } = await api.get('/twits?populate=*&sort[0]=createdAt:desc');

	dispatch(setTwits(data.data));
};

export const postTwitAction = twit => async dispatch => {
	const token = localStorage.getItem('jwt');

	if (!token) return;

	await api.post('/twits', { data: twit });

	dispatch(fetchTwitsAction());
};

export const setLikedTwitsAction = twits => ({ type: SET_TWITS_LIKED_BY_ME, payload: twits });

export const fetchLikedTwitsAction = () => async (dispatch, getState) => {
	const { user } = getState();

	const { data } = await api.get(`/twits?filters[likes][user][id][$eq]=${user.id}&populate=*`);

	dispatch(setLikedTwitsAction(data.data));
};

export const postLikeTwitAction = likeData => async dispatch => {
	await api.post('/likes', { data: likeData });

	dispatch(fetchTwitsAction());
	dispatch(fetchLikedTwitsAction());
};

export const deleteLikeTwitAction = (twitId, userId) => async dispatch => {
	const { data } = await api.get(
		`/likes?filters[user][id][$eq]=${userId}&filters[twit][id][$eq]=${twitId}`
	);

	const like = data.data[0];

	await api.delete(`/likes/${like.id}`);
	dispatch(fetchTwitsAction());
	dispatch(fetchLikedTwitsAction());
};

export const setLikedRepliesAction = replies => ({
	type: SET_REPLIES_LIKED_BY_ME,
	payload: replies,
});

export const fetchLikedRepliesAction = () => async (dispatch, getState) => {
	const { user } = getState();

	const { data } = await api.get(
		`/replies?filters[reply_likes][user][id][$eq]=${user.id}&populate=*`
	);

	dispatch(setLikedRepliesAction(data.data));
};

export const postLikeReplyAction = likeData => async dispatch => {
	await postReplyLike(likeData);

	return dispatch(fetchLikedRepliesAction());
};

export const deleteLikeReplyAction = (replyId, userId) => async dispatch => {
	const replyLike = await findReplyLike(replyId, userId);
	await deleteReplyLike(replyLike.id);

	return dispatch(fetchLikedRepliesAction());
};
