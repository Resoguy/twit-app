import s from './SideContent.module.scss';
import RecommendedUsers from '../../components/RecommendedUsers';

function SideContent() {
	return (
		<div className={s.contentWrapper}>
			<div className={s.searchWrapper}>Search Widget</div>

			<div className={s.exploreWrapper}>Explore Widget</div>

			<div className={s.recommendedWrapper}>
				<RecommendedUsers />
			</div>
		</div>
	);
}

export default SideContent;
