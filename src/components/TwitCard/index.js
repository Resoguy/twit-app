import Card from '../Card';
import Button from '../Button';
import { useNavigate, Link } from 'react-router-dom';
import s from './TwitCard.module.scss';
import { FaHeart, FaRegHeart, FaRegCommentDots, FaRetweet } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postLikeTwitAction, deleteLikeTwitAction } from '../../store/actionCreators';

function TwitCard({ twit, onLike = () => null, onReplyClick = () => null }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = twit.attributes.user.data;
	const likes = twit.attributes.likes.data;
	const replies = twit.attributes.replies.data;
	const me = useSelector(state => state.user);
	const isAuthenticated = !!me;
	const isLikedByMe = useSelector(
		({ twitsLikedByMe }) =>
			twitsLikedByMe && !!twitsLikedByMe.find(likedTwit => likedTwit.id === twit.id)
	);

	const like = async () => {
		const likeData = { twit: twit.id, user: me.id };

		await dispatch(postLikeTwitAction(likeData));
	};

	const dislike = async () => {
		await dispatch(deleteLikeTwitAction(twit.id, me.id));
	};

	const likeHandler = async () => {
		if (!isAuthenticated) {
			return navigate('/login');
		}

		if (isLikedByMe) {
			await dislike();
		} else {
			await like();
		}

		onLike();
	};

	const replyHandler = async () => {
		if (!isAuthenticated) {
			return navigate('/login');
		}

		return onReplyClick();
	};

	const goToDetails = () => {
		navigate(`/${twit.id}`);
	};

	return (
		<Card onClick={goToDetails} padding hoverable>
			<Link className={s.userLink} to={`/profile/${user.id}`} onClick={e => e.stopPropagation()}>
				{user.attributes.username} - {user.attributes.email}
			</Link>
			<p className={s.twitText}>{twit.attributes.text}</p>

			<div className={s.actionsWrapper}>
				<Button
					icon={isLikedByMe ? <FaHeart /> : <FaRegHeart />}
					onClick={likeHandler}
					bubbling={false}
					color='primary'
				>
					{likes.length || '0'}
				</Button>
				<Button icon={<FaRegCommentDots />} bubbling={false} onClick={replyHandler} color='primary'>
					{replies.length || '0'}
				</Button>
				<Button icon={<FaRetweet />} bubbling={false} color='primary'>
					0
				</Button>
			</div>
		</Card>
	);
}

export default TwitCard;
