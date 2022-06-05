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
