
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Card from './Card';

export type CardProps = {
  id: string,
  data: {},
}

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
        return <Card key={card.id} data={card} />
      })}
    </Wrapper>
  )
}

export default ResultList;