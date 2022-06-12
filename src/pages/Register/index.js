import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import { registerAction } from '../../store/actionCreators';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import s from './Register.module.scss';

const registerFormSchema = yup.object({
	username: yup.string().required().min(3),
	email: yup.string().required().email(),
	password: yup.string().required().min(6),
});

function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const register = async values => {
		await dispatch(registerAction(values));
		navigate('/');
	};

	return (
		<div className={s.registerWrapper}>
			<Card padding>
				<h1>Register Page</h1>

				<div>
					<Formik
						initialValues={{ username: '', email: '', password: '' }}
						onSubmit={register}
						validationSchema={registerFormSchema}
					>
						{({ isSubmitting }) => (
							<Form>
								<Field
									as={Input}
									label='Username'
									placeholder='Enter your username...'
									name='username'
								/>

								<Field
									as={Input}
									label='Email'
									placeholder='Enter your email...'
									name='email'
									type='email'
								/>

								<Field
									as={Input}
									label='Password'
									placeholder='Enter your password...'
									name='password'
									type='password'
								/>

								<Button type='submit' isLoading={isSubmitting} color='primary'>
									Register
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</Card>
		</div>
	);
}

export default Register;
