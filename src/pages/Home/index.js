import s from './Home.module.scss';
import { useState } from 'react';
import TwitCard from '../../components/TwitCard';
import TwitForm from '../../components/TwitForm';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal';
import ReplyForm from '../../components/ReplyForm';

function Home() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedTwitId, setSelectedTwitId] = useState(null);
	const twits = useSelector(state => state.twits);
	const isAuthenticated = useSelector(state => !!state.user);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const replyTwit = twitId => {
		setSelectedTwitId(twitId);
		openModal();
	};

	return (
		<>
			<div>
				{isAuthenticated && (
					<div className={s.formWrapper}>
						<TwitForm />
					</div>
				)}

				{twits && (
					<div className={s.feedWrapper}>
						{twits.map(twit => (
							<TwitCard key={twit.id} twit={twit} onReplyClick={() => replyTwit(twit.id)} />
						))}
					</div>
				)}
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ReplyForm onCancel={closeModal} onSuccess={closeModal} twitId={selectedTwitId} />
			</Modal>
		</>
	);
}

export default Home;
