import Card from '../Card';
import Button from '../Button';
import Image from '../Image';
import s from './FollowCard.module.scss';
import { getImageURL } from '../../utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FollowCard({ user }) {
	const navigate = useNavigate();
	const me = useSelector(state => state.user);
	const isFollowedByMe = useSelector(
		({ myFollowings }) =>
			myFollowings &&
			!!myFollowings.find(follow => follow?.attributes?.following?.data?.id === user.id)
	);

	const follow = () => {
		console.log('FOLLOW');
	};

	const unfollow = () => {
		console.log('UNFOLLOW');
	};

	const followHandler = () => {
		if (!me) {
			return navigate('/login');
		}

		if (isFollowedByMe) {
			unfollow();
		} else {
			follow();
		}
	};

	return (
		<Card className={s.followCard} padding border={false} shadow={false}>
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
					variant={isFollowedByMe ? 'outline' : 'regular'}
					onClick={followHandler}
				>
					{isFollowedByMe ? 'Unfollow' : 'Follow'}
				</Button>
			</div>
		</Card>
	);
}

export default FollowCard;
