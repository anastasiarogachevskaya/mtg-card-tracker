import styled from 'styled-components';
import InputField from './InputField';
import Label from './Label';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 600px;
	margin: 0 auto;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const FormButton = styled.button`
	background: #0099ff;
	border: none;
	border-radius: 5px;
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	padding: 10px 20px;
	transition: background 0.3s ease;

	&:hover {
		background: #0077cc;
	}
`;

type FormInputProps = {
	label: string;
	name: string;
	type: string;
	width?: string;
	withButton?: boolean;
	value?: string;
	readOnly?: boolean;
};

const FormInput = ({
	label,
	name,
	type,
	width,
	withButton,
	value,
	readOnly,
	...rest
}: FormInputProps) => {
	return (
		<FormGroup>
			<Label htmlFor={name}>{label}</Label>
			<InputField
				{...rest}
				type={type}
				name={name}
				id={name}
				width={width}
				value={value}
				withButton={withButton}
				readOnly={readOnly}
			/>
		</FormGroup>
	);
};

export { Form, FormGroup, FormButton, FormInput };
