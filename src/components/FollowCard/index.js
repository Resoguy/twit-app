import Card from '../Card';
import Button from '../Button';
import Image from '../Image';
import s from './FollowCard.module.scss';
import { getImageURL } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postFollowingAction, deleteFollowingAction } from '../../store/actionCreators';
import { useState } from 'react';

function FollowCard({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const me = useSelector(state => state.user);
	const followByMe = useSelector(
		({ myFollowings }) =>
			myFollowings &&
			myFollowings.find(follow => follow?.attributes?.following?.data?.id === user.id)
	);
	const [isLoading, setLoading] = useState(false);

	const follow = async () => {
		setLoading(true);
		const followData = { user: me.id, following: user.id };

		await dispatch(postFollowingAction(followData));
		setLoading(false);
	};

	const unfollow = async () => {
		setLoading(true);
		// ...follow objesinin idsini bul
		const followId = followByMe.id;
		// follow datasini sil
		await dispatch(deleteFollowingAction(followId));
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

	const goToProfile = () => {
		navigate(`/profile/${user.id}`);
	};

	return (
		<Card
			className={s.followCard}
			padding
			border={false}
			shadow={false}
			hoverable
			onClick={goToProfile}
		>
			<div className={s.imageWrapper}>
				<Image src={getImageURL(user.photo)} alt={user.username} size='small' />
			</div>

			<div className={s.contentWrapper}>
				<h6 className={s.username}>{user.username}</h6>
				<p className={s.email}>{user.email}</p>
			</div>

			<div className={s.actionsWrapper}>
				<Button
					color='primary'
					variant={followByMe ? 'outline' : 'regular'}
					onClick={followHandler}
					isLoading={isLoading}
					bubbling={false}
				>
					{followByMe ? 'Unfollow' : 'Follow'}
				</Button>
			</div>
		</Card>
	);
}

export default FollowCard;
