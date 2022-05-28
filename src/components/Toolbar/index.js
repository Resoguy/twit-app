import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Toolbar() {
	const user = useSelector(state => state.user);

	return (
		<nav>
			<Link to='/'>Home</Link>

			{user ? (
				<p>Welcome, {user.username}</p>
			) : (
				<>
					<Link to='register'>Register</Link>
					<Link to='login'>Login</Link>
				</>
			)}
		</nav>
	);
}

export default Toolbar;
