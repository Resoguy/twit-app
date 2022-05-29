import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { loginAction } from '../../store/actionCreators';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import s from './Login.module.scss';

const loginFormSchema = yup.object({
	identifier: yup.string().required().min(3),
	password: yup.string().required().min(6),
});

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = async (values, actions) => {
		await dispatch(loginAction(values));
		navigate('/');
	};

	return (
		<div className={s.loginWrapper}>
			<Card padding>
				<h1>Login Page</h1>

				<div>
					<Formik
						initialValues={{ identifier: '', password: '' }}
						onSubmit={login}
						validationSchema={loginFormSchema}
					>
						{({ isSubmitting }) => (
							<Form>
								<Field
									as={Input}
									label='Email or Username'
									name='identifier'
									placeholder='Enter your email or username...'
								/>

								<Field
									as={Input}
									label='Password'
									type='password'
									name='password'
									placeholder='Enter your password...'
								/>

								<Button type='submit' isLoading={isSubmitting}>
									Login
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</Card>
		</div>
	);
}

export default Login;
