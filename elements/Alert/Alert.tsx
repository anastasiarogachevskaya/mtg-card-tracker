import React from 'react';
import styled, { css } from 'styled-components';

import { AlertProps } from './AlertProps';

const error = css`
	color: red;
	background-color: #f8d7da;
	border-color: red;
`;

const success = css`
	color: #155724;
	background-color: #d4edda;
	border-color: #c3e6cb;
`;

const warning = css`
	color: #856404;
	background-color: #fff3cd;
	border-color: #ffeeba;
`;

const info = css`
	color: #0c5460;
	background-color: #d1ecf1;
	border-color: #bee5eb;
`;

const types = {
	error,
	warning,
	success,
	info,
};

const BaseAlert = styled.div<{
	width: Number;
	center: boolean;
	type: 'error' | 'warning' | 'success' | 'info';
}>`
	position: relative;
	padding: 0.75rem 1.25rem;
	margin-bottom: 1rem;
	margin-top: 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
	color: #0c5460;
	background-color: #d1ecf1;
	border-color: #bee5eb;
	max-width: ${({ width }) => width && `${width}px`};
	${({ center }) =>
		center &&
		`
    margin-left: auto;
    margin-right: auto;
  `};
	${({ type }) => types[type]};
`;

const Alert = ({
	type = 'info',
	center = false,
	width = 600,
	testId,
	children,
}: AlertProps) => (
	<BaseAlert
		type={type}
		className={type}
		data-testid={testId}
		center={center}
		width={width}
	>
		{children}
	</BaseAlert>
);

export default Alert;
