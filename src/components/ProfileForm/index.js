import { Formik, Form, Field } from 'formik';
import Card from '../Card';
import Input from '../Input';
import Button from '../Button';
import * as yup from 'yup';
import s from './ProfileForm.module.scss';
import { updateUserDetails } from '../../api';

function ProfileForm({ profile, onCancel, onSuccess }) {
	const save = async values => {
		await updateUserDetails(profile.id, values);
		onSuccess();
	};

	return (
		<Card padding>
			<h1>Profile Form</h1>

			<Formik
				initialValues={{
					username: profile.username,
					email: profile.email,
					bio: profile.bio || '',
					birthday: profile.birthday || '',
					location: profile.location || '',
				}}
				onSubmit={save}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field
							as={Input}
							name='username'
							placeholder='Enter your username...'
							label='Username'
						/>
						<Field
							as={Input}
							name='email'
							type='email'
							placeholder='Enter your email...'
							label='Email'
							disabled
						/>
						<Field
							as={Input}
							name='bio'
							type='textarea'
							placeholder='Enter your bio...'
							label='Bio'
						/>
						<Field
							as={Input}
							name='birthday'
							type='date'
							placeholder='Enter your bio...'
							label='Birthday'
						/>
						<Field
							as={Input}
							name='location'
							placeholder='Enter your location...'
							label='Location'
						/>

						<div className={s.actionsWrapper}>
							<Button type='submit' color='primary' isLoading={isSubmitting}>
								Save
							</Button>
							<Button variant='outline' onClick={onCancel}>
								Cancel
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Card>
	);
}

export default ProfileForm;
