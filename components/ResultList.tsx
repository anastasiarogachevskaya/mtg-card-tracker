import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { ListingCardProps } from '../types/Card/ListingCardProps';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 1200px;
	margin: 0 auto;
	justify-content: space-evenly;
`;

const ResultList = ({ listing }: { listing: ListingCardProps[] }) => {
	return (
		<Wrapper>
			{listing.map((card) => {
				return (
					<Card
						key={card.id}
						id={card.id}
						image_uris={card.image_uris}
						object={card.object}
						set={card.set}
						collector_number={card.collector_number}
						name={card.name}
					/>
				);
			})}
		</Wrapper>
	);
};

export default ResultList;
