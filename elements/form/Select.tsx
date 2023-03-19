import styled from 'styled-components';

interface SelectProps {
	width?: string;
}

export const StyledSelect = styled.select<SelectProps>`
	background: ${({ theme }) => theme.inputFieldBGColor};
	border: none;
	border-radius: 5px;
	box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 8%);
	color: ${({ theme }) => theme.inputFieldColor};
	font-size: 16px;
	font-family: inherit;
	margin: 0;
	line-height: 50px;
	outline: none;
	padding: 0 20px;
	transition: all 0.4s ease;
	width: ${({ width }) => width || '100%'};
	padding: 10px;

	&:hover,
	&:active,
	&:focus,
	&:target {
		background: ${({ theme }) => theme.inputFieldBGColorHover};
	}

	option {
		color: ${({ theme }) => theme.inputFieldColor};
		background-color: ${({ theme }) => theme.inputFieldBGColor};
		border: none;
		outline: none;
	}
`;
