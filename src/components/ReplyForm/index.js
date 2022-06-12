import Card from '../Card';
import Input from '../Input';
import { Formik, Form, Field } from 'formik';
import Button from '../Button';
import * as yup from 'yup';
import s from './ReplyForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { postReply } from '../../api';
import { fetchTwitsAction } from '../../store/actionCreators';

const replyFormSchema = yup.object({
	text: yup.string().required().max(250),
});

function ReplyForm({ twitId, onCancel, onSuccess }) {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const reply = async (values, { resetForm }) => {
		const newReply = { text: values.text, user: user.id, twit: twitId };
		await postReply(newReply);

		await dispatch(fetchTwitsAction());

		onSuccess();
	};

	return (
		<Card padding>
			Reply to twit
			<Formik initialValues={{ text: '' }} onSubmit={reply} validationSchema={replyFormSchema}>
				{({ isSubmitting }) => (
					<Form>
						<Field as={Input} type='textarea' placeholder='Enter your reply...' name='text' />

						<div className={s.actionsWrapper}>
							<Button type='submit' color='primary' isLoading={isSubmitting}>
								Reply
							</Button>
							<Button type='button' variant='outline' onClick={onCancel}>
								Cancel
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Card>
	);
}

export default ReplyForm;
