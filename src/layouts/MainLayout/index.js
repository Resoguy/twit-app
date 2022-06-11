import { Outlet } from 'react-router-dom';
import s from './MainLayout.module.scss';

function MainLayout() {
	return (
		<section className={s.wrapper}>
			<aside>SIDE CONTENT 1</aside>

			<main>
				<Outlet />
			</main>

			<aside>SIDE CONTENT 2</aside>
		</section>
	);
}

export default MainLayout;
