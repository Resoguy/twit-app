import { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FiSend } from 'react-icons/fi';
import { FaCameraRetro } from 'react-icons/fa';
import Card from '../Card';
import Input from '../Input';
import Button from '../Button';
import Image from '../Image';
import * as yup from 'yup';
import { postTwitAction } from '../../store/actionCreators';
import s from './TwitForm.module.scss';

const twitFormSchema = yup.object({
	text: yup.string().required().max(250),
});

function TwitForm() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [imgPreviewURL, setImgPreviewURL] = useState(null);
	const inputRef = useRef(null);

	const sendTwit = async (values, { resetForm }) => {
		const newTwit = { text: values.text, user: user.id };
		const file = inputRef.current.files[0];

		await dispatch(postTwitAction(newTwit, file));
		setImgPreviewURL(null);
		resetForm();
	};

	const openFileInput = () => {
		inputRef.current.click();
	};

	const selectPicture = e => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.addEventListener('load', () => {
			setImgPreviewURL(reader.result);
		});

		if (file) {
			reader.readAsDataURL(file);
		} else {
			setImgPreviewURL(null);
		}
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

						{imgPreviewURL && (
							<div className={s.imageContainer}>
								<Image src={imgPreviewURL} size='large' border={false} variant='rectangle' block />
							</div>
						)}

						<div className={s.actionsWrapper}>
							<input id='picture-input' type='file' ref={inputRef} onChange={selectPicture} />
							<Button
								color='secondary'
								icon={<FaCameraRetro />}
								fab
								onClick={openFileInput}
							></Button>
						</div>

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
