import s from './Home.module.scss';
import TwitCard from '../../components/TwitCard';
import TwitForm from '../../components/TwitForm';
import { useSelector } from 'react-redux';

function Home() {
	const twits = useSelector(state => state.twits);
	const isAuthenticated = useSelector(state => !!state.user);

	return (
		<section className={s.wrapper}>
			<aside>SIDE CONTENT 1</aside>

			<main>
				{isAuthenticated && (
					<div className={s.formWrapper}>
						<TwitForm />
					</div>
				)}

				{twits && (
					<div className={s.feedWrapper}>
						{twits.map(twit => (
							<TwitCard key={twit.id} twit={twit} />
						))}
					</div>
				)}
			</main>

			<aside>SIDE CONTENT 2</aside>
		</section>
	);
}

export default Home;
