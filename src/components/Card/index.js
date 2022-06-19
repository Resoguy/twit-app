import cc from 'classcat';
import s from './Card.module.scss';

function Card({
	children,
	padding = false,
	shadow = true,
	border = true,
	hoverable = false,
	relative = false,
	onClick = () => null,
}) {
	// const className = `${s.card} ${padding ? s.padding : ''} ${shadow ? s.shadow : ''}`;
	const className = cc({
		[s.card]: true,
		[s.padding]: padding,
		[s.shadow]: shadow,
		[s.border]: border,
		[s.hover]: hoverable,
		[s.relative]: relative,
	});

	return (
		<div className={className} onClick={onClick} tabIndex={1}>
			{children}
		</div>
	);
}

export default Card;
