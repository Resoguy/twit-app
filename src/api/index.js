import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:1337/api',
});

const addHeaders = config => {
	const token = localStorage.getItem('jwt');

	if (!token) return config;

	config.headers['Authorization'] = `Bearer ${token}`;

	return config;
};

api.interceptors.request.use(addHeaders);

export default api;

// Utility API functions

export const fetchTwitDetails = async twitId => {
	const { data } = await api.get(`/twits/${twitId}?populate=*`);

	return data;
};

export const fetchRepliesByTwitId = async twitId => {
	const { data } = await api.get(`/replies?filters[twit][id][$eq]=${twitId}&populate=*`);

	return data;
};

export const postReply = async replyData => {
	return api.post(`/replies`, { data: replyData });
};

export const postReplyLike = async likeData => {
	return api.post(`/reply-likes`, { data: likeData });
};

export const deleteReplyLike = async replyLikeId => {
	return api.delete(`/reply-likes/${replyLikeId}`);
};

export const findReplyLike = async (replyId, userId) => {
	const { data } = await api.get(
		`/reply-likes?filters[user][id][$eq]=${userId}&filters[reply][id][$eq]=${replyId}`
	);

	const replyLike = data.data[0];

	return replyLike;
};

export const fetchUserDetails = async userId => {
	const { data } = await api.get(`/users/${userId}?populate=*`);

	return data;
};
