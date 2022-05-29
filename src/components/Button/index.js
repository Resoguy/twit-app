import s from './Button.module.scss';

function Button({ children, isLoading = false, color = 'primary', type = 'button', ...rest }) {
	const className = `${s.btn} ${s[color]}`;

	return (
		<button className={className} type={type} disabled={isLoading} {...rest}>
			{isLoading ? 'Loading...' : children}
		</button>
	);
}

export default Button;
