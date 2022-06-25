import cc from 'classcat';
import s from './Image.module.scss';

function Image({
	className,
	variant = 'circle',
	size = 'medium', // 'small' || 'medium' || 'large'
	onClick = () => null,
	hoverable = false,
	border = true,
	block = false,
	hoverIcon,
	src,
	alt,
	...rest
}) {
	const classNames = cc({
		[s[size]]: true,
		[s[variant]]: true,
		[s.imgWrapper]: true,
		[className]: className,
		[s.hoverable]: hoverable,
		[s.border]: border,
		[s.block]: block,
	});

	return (
		<div className={classNames} onClick={onClick} tabIndex={1}>
			{hoverable && <span className={s.hoverTint}>{hoverIcon}</span>}
			<img className={s.img} src={src} alt={alt} {...rest} />
		</div>
	);
}

export default Image;
