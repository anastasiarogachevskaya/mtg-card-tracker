import axios from 'axios';
import React, { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import styled from 'styled-components';
import Button from '../elements/Form/Button/Button';
import InputField from '../elements/Form/InputField';

const Form = styled.form`
	width: 100%;
	flex: 2;
`;

const Flex = styled.div`
	display: flex;
`;

const List = styled.ul`
	list-style: none;
	padding: 0.95em 0;
	border-radius: 0 0 5px 5px;
	margin: -5px 0 0 0;
	background: #fff;
	box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 8%);
	color: #666;
	font-size: 16px;
	width: calc(100% - 55px);
	position: absolute;
	top: 70px;
	z-index: 100;
`;

const ListItem = styled.li`
	line-height: 1.5;
	padding: 1px 1em;
	cursor: pointer;
	background: transparent;
	transition: all 0.1s ease-in-out;
	&:hover {
		background: #f0f0f0;
	}
`;

const SearchForm = ({ onSearch }: any) => {
	const [searchString, setSearchString] = useState<string>('');
	const [suggestions, setSuggestions] = useState([]);

	const onChange = async (text: string) => {
		const { data } = await axios(
			`${process.env.NEXT_PUBLIC_API_HOST}/api/search/autocomplete?q=${text}`
		);
		setSuggestions(data);
		setSearchString(text);
	};
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSuggestions([]);
		onSearch(searchString);
	};
	const onSuggestHandler = (text: string) => {
		setSearchString(text);
		onSearch(text);
		setSuggestions([]);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onSearch(searchString);
		}
	};

	return (
		<Form onSubmit={onSubmit}>
			<Flex>
				<InputField
					id='searchField'
					type='search'
					onChange={(e) => onChange(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder='Search...'
					withButton
					autoComplete='off'
					value={searchString}
					// onBlur={() => setSuggestions([])}
				/>
				{suggestions.length > 0 && (
					<List>
						{suggestions.map((suggestion, index) => (
							<ListItem
								key={`${suggestion}.${index}`}
								onClick={() => onSuggestHandler(suggestion)}
							>
								{suggestion}
							</ListItem>
						))}
					</List>
				)}
				<Button withInput>
					<RiSearch2Line />
				</Button>
			</Flex>
		</Form>
	);
};

export default SearchForm;