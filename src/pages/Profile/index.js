import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarDay, FaRegEdit, FaCameraRetro } from 'react-icons/fa';
import { fetchUserDetails, uploadPhoto } from '../../api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Image from '../../components/Image';
import s from './Profile.module.scss';
import ProfileForm from '../../components/ProfileForm';
import ProfileContent from '../../components/ProfileContent';
import {
	fetchMeAction,
	postFollowingAction,
	deleteFollowingAction,
} from '../../store/actionCreators';
import { getImageURL } from '../../utils';

function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userId } = useParams();
	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const me = useSelector(state => state.user);
	const isMyProfile = me && user && me.id === user.id;
	const followByMe = useSelector(
		({ myFollowings }) =>
			myFollowings &&
			user &&
			myFollowings.find(follow => follow?.attributes?.following?.data?.id === user.id)
	);

	const fetchProfile = async () => {
		const data = await fetchUserDetails(userId);

		setUser(data);
	};

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const saveProfile = async () => {
		// close modal
		closeModal();
		// update local state
		await fetchProfile();
		// Redux update
		dispatch(fetchMeAction());
	};

	const changePhoto = async event => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('files', file);
		formData.append('ref', 'plugin::users-permissions.user');
		formData.append('refId', user.id);
		formData.append('field', event.target.name);
		// file objesini backende yollayip profile editlemis olacagiz
		await uploadPhoto(formData);
		// profil datasini guncelleme
		await fetchProfile();
		// redux storeu guncelleme
		dispatch(fetchMeAction());
	};

	const openPhotoInput = e => {
		if (!isMyProfile) {
			return e.preventDefault();
		}
	};

	const follow = async () => {
		setLoading(true);

		const followData = { user: me.id, following: user.id };
		await dispatch(postFollowingAction(followData));

		setLoading(false);
	};

	const unfollow = async () => {
		setLoading(true);

		await dispatch(deleteFollowingAction(followByMe.id));

		setLoading(false);
	};

	const followHandler = () => {
		if (!me) {
			return navigate('/login');
		}

		if (followByMe) {
			unfollow();
		} else {
			follow();
		}
	};

	useEffect(() => {
		fetchProfile();
	}, [userId]);

	return (
		<>
			<input
				className={s.fileInput}
				name='photo'
				id='file-input'
				type='file'
				onChange={changePhoto}
			/>
			<input
				className={s.fileInput}
				name='cover'
				id='cover-input'
				type='file'
				onChange={changePhoto}
			/>
			<div className={s.wrapper}>
				{user && (
					<>
						<label htmlFor='cover-input' onClick={openPhotoInput}>
							<Image
								src={getImageURL(user.cover, 'cover')}
								alt='cover'
								variant='rectangle'
								border={false}
								block
								hoverable={isMyProfile}
								hoverIcon={<FaCameraRetro />}
							/>
						</label>
						<Card padding relative>
							<label htmlFor='file-input' onClick={openPhotoInput}>
								<Image
									className={s.profileImg}
									src={getImageURL(user.photo)}
									alt='profile'
									hoverable={isMyProfile}
									hoverIcon={<FaCameraRetro />}
								/>
							</label>

							<div className={s.cardHeader}>
								<h2 className={s.usernameText}>{user.username}</h2>
								{isMyProfile ? (
									<Button
										variant='outline'
										color='secondary'
										icon={<FaRegEdit />}
										onClick={openModal}
									>
										Edit
									</Button>
								) : (
									<Button
										variant={followByMe ? 'outline' : 'regular'}
										color='primary'
										onClick={followHandler}
										isLoading={isLoading}
									>
										{followByMe ? 'Unfollow' : 'Follow'}
									</Button>
								)}
							</div>

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

						<div className={s.profileContentWrapper}>
							<ProfileContent />
						</div>
					</>
				)}
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ProfileForm profile={user} onCancel={closeModal} onSuccess={saveProfile} />
			</Modal>
		</>
	);
}

export default Profile;
