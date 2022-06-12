import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FiSend } from 'react-icons/fi';
import Card from '../Card';
import Input from '../Input';
import Button from '../Button';
import * as yup from 'yup';
import { postTwitAction } from '../../store/actionCreators';

const twitFormSchema = yup.object({
	text: yup.string().required().max(250),
});

function TwitForm() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const sendTwit = async (values, { resetForm }) => {
		const newTwit = { text: values.text, user: user.id };

		await dispatch(postTwitAction(newTwit));
		resetForm();
	};

	return (
		<Card padding>
			<h3>Send A Twit</h3>

			<Formik initialValues={{ text: '' }} onSubmit={sendTwit} validationSchema={twitFormSchema}>
				{({ isSubmitting }) => (
					<Form>
						<Field
							as={Input}
							type='textarea'
							name='text'
							placeholder='Enter your twit...'
							label='Your Twit'
						/>

						<Button type='submit' isLoading={isSubmitting} icon={<FiSend />} color='primary'>
							Twit
						</Button>
					</Form>
				)}
			</Formik>
		</Card>
	);
}

export default TwitForm;
