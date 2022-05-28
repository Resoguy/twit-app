import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/actionCreators';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginForm, setLoginForm] = useState({
		identifier: '',
		password: '',
	});

	const login = async e => {
		e.preventDefault();

		await dispatch(loginAction(loginForm));
		navigate('/');
	};

	return (
		<div>
			<h1>Login Page</h1>

			<div>
				<form onSubmit={login}>
					<div>
						<label htmlFor='identifier'>Email or Username</label>
						<input
							type='text'
							placeholder='Enter your email or username...'
							id='identifier'
							name='identifier'
							value={loginForm.identifier}
							onChange={e => setLoginForm({ ...loginForm, identifier: e.target.value })}
						/>
					</div>

					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							placeholder='Enter your password...'
							id='password'
							name='password'
							value={loginForm.password}
							onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
						/>
					</div>

					<button type='submit'>Login</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
