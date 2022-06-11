import Card from '../Card';
import Input from '../Input';
import { Formik, Form, Field } from 'formik';
import Button from '../Button';

function ReplyForm() {
	const reply = (values, { resetForm }) => {
		console.log(values);
	};

	return (
		<Card padding>
			Reply to twit
			<Formik initialValues={{ text: '' }} onSubmit={reply}>
				<Form>
					<Field as={Input} type='textarea' placeholder='Enter your reply...' name='text' />

					<Button type='submit'>Reply</Button>
				</Form>
			</Formik>
		</Card>
	);
}

export default ReplyForm;
