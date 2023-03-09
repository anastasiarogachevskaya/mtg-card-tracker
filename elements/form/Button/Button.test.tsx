import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ButtonEl from './Button';

describe('ButtonEl', () => {
	test('renders button with correct text', () => {
		const { getByText } = render(<ButtonEl>Click me</ButtonEl>);
		expect(getByText('Click me')).toBeDefined();
	});

	test('renders link with correct href', () => {
		const { getByText } = render(
			<ButtonEl href='https://example.com'>Go to example.com</ButtonEl>
		);
		const linkElement = getByText('Go to example.com');
		expect(linkElement).toBeDefined();
		expect(linkElement).toHaveProperty('href', 'https://example.com/');
	});

	test('calls onClick handler when button is clicked', () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<ButtonEl onClick={handleClick}>Click me</ButtonEl>
		);
		const buttonElement = getByText('Click me');
		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	// Add more tests as needed
});
