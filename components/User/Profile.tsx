import React, { useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { signOut, useSession } from 'next-auth/react';
import { FaPlus } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';
import { VscError } from 'react-icons/vsc';

import ButtonEl from '../../elements/Form/Button/Button';
import InputField from '../../elements/Form/InputField';
import Spacer from '../../elements/UI/Spacer';

import DeckList from './DeckList';

import { Form, FormInput } from '../../elements/Form/Form';
import { StyledSelect } from '../../elements/Form/Select';
import Label from '../../elements/Form/Label';

const Container = styled.div`
	margin: 1em;
`;

const PageTitle = styled.h1`
	text-align: center;
`;

const Text = styled.p`
	text-align: center;
`;

const Flex = styled.div`
	display: flex;
`;
type Optional<T> = { [P in keyof T]?: T[P] extends null ? undefined : T[P] };

type User = Optional<{
	name: string;
	email: string;
	image: string;
	currency?: 'USD' | 'EUR';
}>;

const Profile = ({ user }: { user: User }) => {
	if (!user) {
		return <Container>Please log in to view your profile.</Container>;
	}
	const { data: session } = useSession();
	const [currency, setCurrency] = useState(user.currency ?? 'USD');

	const [start, setStart] = useState(false);
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);
	const [failed, setFailed] = useState(false);
	const deckName = useRef() as React.RefObject<HTMLInputElement>;
	const handleCurrencyChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCurrency(event.target.value);
	};

	const handleSave = async (
		event:
			| { preventDefault: () => void }
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		try {
			const response = await axios.patch('/api/user/update', { currency });
			console.log(response.data); // { success: true }
		} catch (error) {
			console.error(error);
		}
	};

	const { name, email } = user;

	function startHandler() {
		if (start) {
			setStart(false);
		} else {
			setStart(true);
		}
	}

	function createNewDeckHandler(event: { preventDefault: () => void }) {
		event.preventDefault();

		setLoading(true);

		axios
			.post('/api/decks/create', {
				deck: deckName?.current!.value || 'New Deck',
				user: email,
			})
			.then(() => {
				setLoading(false);
				setDone(true);
			})
			.catch(() => {
				setLoading(false);
				setFailed(true);
			});
	}
	return (
		<Container>
			<PageTitle>Profile</PageTitle>
			<Text>Welcome, {name}!</Text>

			<Form>
				<FormInput
					label='Name'
					type='text'
					name='Name'
					value={user.name}
					readOnly
				/>
				<FormInput
					label='Email'
					type='email'
					name='Email'
					value={user.email}
					readOnly
				/>
				{user.image && (
					<FormInput
						label='Image'
						type='text'
						name='Image'
						value={user.image}
						readOnly
					/>
				)}

				<Label>Currency</Label>
				<StyledSelect
					width='75px'
					name='select'
					id='currency'
					value={currency}
					onChange={handleCurrencyChange}
				>
					<option value='USD'>USD</option>
					<option value='EUR'>EUR</option>
				</StyledSelect>
				<ButtonEl onClick={(e) => handleSave(e)} style={{ alignSelf: 'end' }}>
					Save
				</ButtonEl>
			</Form>
			<Flex>
				<ButtonEl onClick={startHandler}>Add new deck</ButtonEl>
				{start && (
					<>
						<Spacer size='5' />
						<InputField
							placeholder='Deck Title'
							width='250px'
							withButton
							ref={deckName}
						/>
						<ButtonEl onClick={createNewDeckHandler} withInput>
							{done && <MdDone />}
							{loading && <BiLoaderCircle />}
							{failed && <VscError />}
							{!loading && !failed && !done && <FaPlus />}
						</ButtonEl>
					</>
				)}
			</Flex>

			{email && <DeckList email={email} />}

			<ButtonEl onClick={() => signOut()}>Sign Out</ButtonEl>
		</Container>
	);
};

export default Profile;
