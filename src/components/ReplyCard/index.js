import { FaRegHeart } from 'react-icons/fa';
import Card from '../Card';
import Button from '../Button';
import s from './ReplyCard.module.scss';

function ReplyCard({ reply }) {
	const user = reply.attributes.user.data;

	return (
		<Card padding>
			<h6>
				{user.attributes.username} - {user.attributes.email}
			</h6>
			<p className={s.replyText}>{reply.attributes.text}</p>

			<div>
				<Button icon={<FaRegHeart />}>0</Button>
			</div>
		</Card>
	);
}

export default ReplyCard;
