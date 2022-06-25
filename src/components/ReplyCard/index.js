import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import Button from '../Button';
import Image from '../Image';
import s from './ReplyCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { postLikeReplyAction, deleteLikeReplyAction } from '../../store/actionCreators';
import { getImageURL } from '../../utils';

function ReplyCard({ reply, onLike }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = reply.attributes.user.data;
	const profilePhoto = user.attributes.photo?.data?.attributes;
	const likes = reply.attributes.reply_likes.data;
	const me = useSelector(state => state.user);
	const isAuthenticated = !!me;
	const isLikedByMe = useSelector(
		({ repliesLikedByMe }) =>
			!!repliesLikedByMe && repliesLikedByMe.find(likedReply => likedReply.id === reply.id)
	);

	const likeReply = async () => {
		const likeData = { reply: reply.id, user: me.id };

		return dispatch(postLikeReplyAction(likeData));
	};

	const unlikeReply = async () => {
		return dispatch(deleteLikeReplyAction(reply.id, me.id));
	};

	const likeHandler = async () => {
		if (!isAuthenticated) {
			return navigate('/login');
		}

		if (isLikedByMe) {
			await unlikeReply();
		} else {
			await likeReply();
		}

		onLike();
	};

	return (
		<Card padding>
			<Link className={s.userLink} to={`/profile/${user.id}`}>
				<Image src={getImageURL(profilePhoto)} alt='profile' border={false} size='small' />
				<p>
					{user.attributes.username} <span className={s.emailText}>{user.attributes.email}</span>
				</p>
			</Link>
			<p className={s.replyText}>{reply.attributes.text}</p>

			<div>
				<Button
					icon={isLikedByMe ? <FaHeart /> : <FaRegHeart />}
					color='primary'
					onClick={likeHandler}
				>
					{likes.length || '0'}
				</Button>
			</div>
		</Card>
	);
}

export default ReplyCard;
