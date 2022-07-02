import Tabs from '../Tabs';
import s from './ProfileContent.module.scss';
import ProfileTwits from '../ProfileTwits';
import ProfileReplies from '../ProfileReplies';

const Components = {
	t: <ProfileTwits />,
	r: <ProfileReplies />,
};

function ProfileContent() {
	return (
		<div>
			<Tabs
				defaultTab='t'
				name='profile-tabs'
				items={[
					{ value: 't', label: 'Twits' },
					{ value: 'r', label: 'Replies' },
				]}
				components={Components}
			/>
		</div>
	);
}

export default ProfileContent;
