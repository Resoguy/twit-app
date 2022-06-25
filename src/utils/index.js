import { BASE_URL } from './constants';
import genericProfileImg from '../assets/images/generic-user-photo.png';
import defaultCoverImg from '../assets/images/default-cover.jpg';

const defaultImgs = {
	cover: defaultCoverImg,
	profile: genericProfileImg,
};

export function getImageURL(image, type = 'profile') {
	if (!image || !image.url) {
		return defaultImgs[type];
	}

	return `${BASE_URL}${image.url}`;
}
