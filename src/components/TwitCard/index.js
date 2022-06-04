import Card from '../Card';

function TwitCard({ twit }) {
	const user = twit.attributes.user.data;

	return (
		<Card padding>
			<h6>
				{user.attributes.username} - {user.attributes.email}
			</h6>
			<p>{twit.attributes.text}</p>
		</Card>
	);
}

export default TwitCard;
