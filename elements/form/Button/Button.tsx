import styled, { css } from 'styled-components';

import { ButtonProps, ButtonElementProps } from './ButtonProps';

const common = css`
	background: #000;
	color: #fff;
	border: 0;
	padding: 10px 20px;
	cursor: pointer;
	transition: all 0.3s ease;
	border: 1px solid #000;

	&:hover {
		background: #fff;
		color: #000;
	}
`;

const Button = styled.button<ButtonProps>`
	${common};
	background: ${({ background }) => background || '#000'};
	padding: ${({ padding }) => padding || '10px 20px'};
	color: ${({ color }) => color || '#FFF'};
	border-radius: ${({ withInput }) => (withInput ? '0 5px 5px 0' : '5px')};
`;

const Link = styled.a`
	${common};
	text-transform: uppercase;
`;

const ButtonEl = (props: ButtonElementProps) => {
	const {
		href,
		withInput,
		children,
		onClick,
		padding,
		background,
		color,
		style,
	} = props;
	if (href) {
		return <Link href={href}>{children}</Link>;
	}
	return (
		<Button
			withInput={withInput}
			onClick={onClick}
			padding={padding}
			background={background}
			color={color}
			style={style}
		>
			{children}
		</Button>
	);
};

export default ButtonEl;
