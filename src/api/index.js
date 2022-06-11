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

export const fetchTwitDetails = async twitId => {
	const { data } = await api.get(`/twits/${twitId}?populate=*`);

	return data;
};

export const fetchRepliesByTwitId = async twitId => {
	const { data } = await api.get(`/replies?filters[twit][id][$eq]=${twitId}&populate[0]=user`);

	return data;
};
