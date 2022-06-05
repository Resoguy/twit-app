import Card from '../Card';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import s from './TwitCard.module.scss';
import { FaHeart, FaRegHeart, FaRegCommentDots, FaRetweet } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postLikeTwitAction, deleteLikeTwitAction } from '../../store/actionCreators';

function TwitCard({ twit }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = twit.attributes.user.data;
	const likes = twit.attributes.likes.data;
	const me = useSelector(state => state.user);
	const isAuthenticated = !!me;
	const isLikedByMe = useSelector(
		({ twitsLikedByMe }) =>
			twitsLikedByMe && !!twitsLikedByMe.find(likedTwit => likedTwit.id === twit.id)
	);

	const like = async () => {
		if (!isAuthenticated) {
			return navigate('/login');
		}

		const likeData = { twit: twit.id, user: me.id };

		await dispatch(postLikeTwitAction(likeData));
	};

	const dislike = async () => {
		if (!isAuthenticated) {
			return navigate('/login');
		}

		dispatch(deleteLikeTwitAction(twit.id, me.id));
	};

	return (
		<Card padding>
			<h6>
				{user.attributes.username} - {user.attributes.email}
			</h6>
			<p className={s.twitText}>{twit.attributes.text}</p>

			<div className={s.actionsWrapper}>
				<Button
					icon={isLikedByMe ? <FaHeart /> : <FaRegHeart />}
					onClick={isLikedByMe ? dislike : like}
				>
					{likes.length || '0'}
				</Button>
				<Button icon={<FaRegCommentDots />}>0</Button>
				<Button icon={<FaRetweet />}>0</Button>
			</div>
		</Card>
	);
}

export default TwitCard;
