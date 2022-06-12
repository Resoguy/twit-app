import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../api';
import Card from '../../components/Card';
import { FaMapMarkerAlt, FaCalendarDay } from 'react-icons/fa';
import s from './Profile.module.scss';

function Profile() {
	const { userId } = useParams();
	const [user, setUser] = useState(null);

	const fetchProfile = async () => {
		const data = await fetchUserDetails(userId);

		setUser(data);
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<div>
			{user && (
				<Card padding>
					<h2 className={s.usernameText}>{user.username}</h2>

					<h4 className={s.emailText}>{user.email}</h4>

					<div className={s.userInfo}>
						<p className={s.bioText}>{user.bio}</p>
						<p className={s.birthdayText}>
							<FaCalendarDay /> {user.birthday}
						</p>
						<p className={s.locationText}>
							<FaMapMarkerAlt /> {user.location}
						</p>
					</div>
				</Card>
			)}
		</div>
	);
}

export default Profile;
