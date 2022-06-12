import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/actionCreators';
import { FaTwitter } from 'react-icons/fa';
import s from './Toolbar.module.scss';

function Toolbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.user);

	const logout = e => {
		e.preventDefault();

		dispatch(logoutAction());
		navigate('/login');
	};

	return (
		<nav className={s.toolbar}>
			<Link className={s.brandLogo} to='/'>
				<FaTwitter />
			</Link>

			<ul className={s.navList}>
				{user ? (
					<>
						<li className={s.navItem}>
							<span className={s.navText}>Welcome, {user.username}</span>
						</li>
						<li className={s.navItem}>
							<Link className={s.navLink} to={`profile/${user.id}`}>
								Profile
							</Link>
						</li>
						<li className={s.navItem}>
							<a href='#' className={s.navLink} onClick={logout}>
								Logout
							</a>
						</li>
					</>
				) : (
					<>
						<li className={s.navItem}>
							<Link className={s.navLink} to='register'>
								Register
							</Link>
						</li>
						<li className={s.navItem}>
							<Link className={s.navLink} to='login'>
								Login
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Toolbar;
