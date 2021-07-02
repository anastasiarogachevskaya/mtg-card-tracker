
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Card, { CardProps } from './Card';

export type ListingProps = {
  listing: CardProps[],
}

const Wrapper = styled.div`
  display: flex; 
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-evenly;
`;

const ResultList: FC<ListingProps> = ({ listing }) => {
  return (
    <Wrapper>
      {listing.map((card) => {
        return <Card 
          key={card.id}
          id={card.id}
          image_uris={card.image_uris} 
          object={card.object}
          set={card.set}
          collector_number={card.collector_number}
          name={card.name}
        />
      })}
    </Wrapper>
  )
}

export default ResultList;