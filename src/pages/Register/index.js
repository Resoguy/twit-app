import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../../store/actionCreators';

function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [registerForm, setRegisterForm] = useState({
		username: '',
		email: '',
		password: '',
	});

	const register = async e => {
		e.preventDefault();

		await dispatch(registerAction(registerForm));
		navigate('/');
	};

	return (
		<div>
			<h1>Register Page</h1>

			<div>
				<form onSubmit={register}>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							placeholder='Enter your username...'
							id='username'
							name='username'
							value={registerForm.username}
							onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })}
						/>
					</div>

					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							placeholder='Enter your email...'
							id='email'
							name='email'
							value={registerForm.email}
							onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
						/>
					</div>

					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							placeholder='Enter your password...'
							id='password'
							name='password'
							value={registerForm.password}
							onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
						/>
					</div>

					<button type='submit'>Register</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
