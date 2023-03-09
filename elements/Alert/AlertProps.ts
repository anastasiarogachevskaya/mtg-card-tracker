export type AlertProps = {
	/**
	 * The type of alert to display.
	 * @default 'info'
	 * error: red text with lighter red background;
	 * warning: brownish text with yellow background;
	 * success: green text with lighter green background;
	 */
	type?: 'error' | 'warning' | 'success' | 'info';
	/**
	 * Whether to center the alert.
	 */
	center?: boolean;
	/**
	 * The width of the alert.
	 * @default 600
	 */
	width?: number;
	testId?: string;
	children: React.ReactNode;
};
