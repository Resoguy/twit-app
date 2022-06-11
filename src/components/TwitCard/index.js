import Card from '../Card';
import Button from '../Button';
import { useNavigate, Link } from 'react-router-dom';
import s from './TwitCard.module.scss';
import { FaHeart, FaRegHeart, FaRegCommentDots, FaRetweet } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postLikeTwitAction, deleteLikeTwitAction } from '../../store/actionCreators';

function TwitCard({ twit, onLike, onReplyClick }) {
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

	return (
		<Link className={s.linkWrapper} to={`/${twit.id}`}>
			<Card padding hoverable>
				<h6>
					{user.attributes.username} - {user.attributes.email}
				</h6>
				<p className={s.twitText}>{twit.attributes.text}</p>

				<div className={s.actionsWrapper}>
					<Button
						icon={isLikedByMe ? <FaHeart /> : <FaRegHeart />}
						onClick={likeHandler}
						bubbling={false}
					>
						{likes.length || '0'}
					</Button>
					<Button icon={<FaRegCommentDots />} bubbling={false} onClick={onReplyClick}>
						{replies.length || '0'}
					</Button>
					<Button icon={<FaRetweet />} bubbling={false}>
						0
					</Button>
				</div>
			</Card>
		</Link>
	);
}

export default TwitCard;
