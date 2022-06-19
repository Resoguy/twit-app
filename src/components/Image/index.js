import cc from 'classcat';
import s from './Image.module.scss';

function Image({
	className,
	onClick = () => null,
	hoverable = false,
	hoverIcon,
	src,
	alt,
	...rest
}) {
	const classNames = cc({
		[s.imgWrapper]: true,
		[className]: className,
		[s.hoverable]: hoverable,
	});

	return (
		<div className={classNames} onClick={onClick} tabIndex={1}>
			{hoverable && <span className={s.hoverTint}>{hoverIcon}</span>}
			<img className={s.img} src={src} alt={alt} {...rest} />
		</div>
	);
}

export default Image;
