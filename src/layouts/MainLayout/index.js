import { Outlet } from 'react-router-dom';
import s from './MainLayout.module.scss';
import SideContent from '../../pages/SideContent';

function MainLayout() {
	return (
		<section className={s.wrapper}>
			<aside>SIDE CONTENT 1</aside>

			<main>
				<Outlet />
			</main>

			<aside>
				<SideContent />
			</aside>
		</section>
	);
}

export default MainLayout;
