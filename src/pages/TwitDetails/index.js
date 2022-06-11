import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTwitDetails, fetchRepliesByTwitId } from '../../api';
import TwitCard from '../../components/TwitCard';
import ReplyCard from '../../components/ReplyCard';
import s from './TwitDetails.module.scss';
import Modal from '../../components/Modal';
import ReplyForm from '../../components/ReplyForm';

function TwitDetails() {
	const { id } = useParams();
	const [twit, setTwit] = useState(null);
	const [replies, setReplies] = useState(null);
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const fetchTwit = async () => {
		const data = await fetchTwitDetails(id);

		setTwit(data.data);
	};

	const fetchReplies = async () => {
		const data = await fetchRepliesByTwitId(id);

		setReplies(data.data);
	};

	useEffect(() => {
		fetchTwit();
		fetchReplies();
	}, []);

	return (
		<div className={s.wrapper}>
			{twit && <TwitCard twit={twit} onLike={fetchTwit} onReplyClick={openModal} />}

			<div className={s.replyWrapper}>
				{replies && replies.map(reply => <ReplyCard key={reply.id} reply={reply} />)}
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ReplyForm />
			</Modal>
		</div>
	);
}

export default TwitDetails;
