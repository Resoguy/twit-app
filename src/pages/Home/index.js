import s from './Home.module.scss';
import { useState } from 'react';
import TwitCard from '../../components/TwitCard';
import TwitForm from '../../components/TwitForm';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal';
import ReplyForm from '../../components/ReplyForm';

function Home() {
	const [isModalOpen, setModalOpen] = useState(false);
	const twits = useSelector(state => state.twits);
	const isAuthenticated = useSelector(state => !!state.user);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

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
							<TwitCard key={twit.id} twit={twit} onReplyClick={() => openModal()} />
						))}
					</div>
				)}
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ReplyForm />
			</Modal>
		</>
	);
}

export default Home;
