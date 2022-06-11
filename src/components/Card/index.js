import cc from 'classcat';
import s from './Card.module.scss';

function Card({ children, padding = false, shadow = true, border = true, hoverable = false }) {
	// const className = `${s.card} ${padding ? s.padding : ''} ${shadow ? s.shadow : ''}`;
	const className = cc({
		[s.card]: true,
		[s.padding]: padding,
		[s.shadow]: shadow,
		[s.border]: border,
		[s.hover]: hoverable,
	});

	return <div className={className}>{children}</div>;
}

export default Card;
