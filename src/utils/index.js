import { BASE_URL } from './constants';
import genericProfileImg from '../assets/images/generic-user-photo.png';

export function getImageURL(image) {
	if (!image || !image.url) {
		return genericProfileImg;
	}

	return `${BASE_URL}${image.url}`;
}
