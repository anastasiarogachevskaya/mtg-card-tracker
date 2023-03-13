export interface ButtonProps {
	withInput?: boolean;
	href?: string;
	padding?: string;
	background?: string;
}

export type ButtonElementProps = ButtonProps & {
	color?: string;
	children?: React.ReactNode;
	onClick?: (
		e:
			| { preventDefault: () => void }
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
};
