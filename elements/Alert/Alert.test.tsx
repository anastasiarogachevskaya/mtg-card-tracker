import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Alert from './Alert';

describe('Alert', () => {
	it('renders the alert with the correct type', () => {
		render(
			<Alert type='error' testId='alert'>
				Error message
			</Alert>
		);
		const alert = screen.getByTestId('alert');
		expect(alert).toHaveClass('error');
	});

	it('renders the alert with the correct content', () => {
		render(<Alert testId='alert'>Info message</Alert>);
		const alert = screen.getByTestId('alert');
		expect(alert).toHaveTextContent('Info message');
	});

	it('renders the alert with the center attribute', () => {
		render(
			<Alert center testId='alert'>
				Centered message
			</Alert>
		);
		const alert = screen.getByTestId('alert');
		expect(alert).toHaveStyle('margin-left: auto');
		expect(alert).toHaveStyle('margin-right: auto');
	});

	it('renders the alert with the specified width', () => {
		render(
			<Alert width={400} testId='alert'>
				Narrow message
			</Alert>
		);
		const alert = screen.getByTestId('alert');
		expect(alert).toHaveStyle('max-width: 400px');
	});
});
