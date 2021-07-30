
import React, { FC } from 'react';
import styled from "styled-components";
import Image from 'next/image';
import getManaCost from '../utils/getManaCost';
import { device } from '../constants/breakpoints';
import Link from 'next/link';
import StyledLink from '../elements/StyledLink';

export type CardProps = {
  data: {
    artist: string;
    id: string;
    object: string;
    name: string;
    type_line: string;
    image_uris: {
      png: string;
      small: string;
      normal: string;
      large: string;
      border_crop: string;
    },
    oracle_text: string;
    cmc: number;
    mana_cost: string;
    flavor_text: string;
    color_identity: [];
    set_name: string;
    set_type: string;
    released_at: string;
    rarity: string;
    reserved: boolean;
    reprint: boolean;
    promo: boolean;
    collector_number: number;
    prices: string[]
  },
  
}

export type AbbrProps = {
  cost?: string;
  colorName?: string;
}

export type CMCProps = {
  type: string;
  title: string;
  class: string;
}

export type BProps = {
  uppercase?: boolean;
}

const Wrapper = styled.article`
  width: 100%;
  background: #FFF;
  border-radius: 15px;;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
  }
`;

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  @media ${device.tablet} {
    padding: 80px;
    border-right: 1px solid #bdbdbd;
  }
`;

const InfoWrapper = styled.div`
  @media ${device.tablet} {
    padding: 40px;
  }
`;

const Title = styled.h1`
  font-family: baskerville-urw, serif;
  font-weight: 500;
  font-size: 2rem;
  margin: .1em 0;
`;
const Subtitle = styled.div`
  font-family: baskerville-urw, serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.5;
  padding: 10px 0;
  margin: 10px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;
const Description = styled.div`
  font-family: sofia-pro,sans-serif;
`;
const FlavorText = styled.div`
  font-family: sofia-pro-condensed, sans-serif;
  font-weight: 100;
  font-style: italic;
`;
const StyledB = styled.strong<BProps>`
  ${({ uppercase }) => uppercase && `text-transform: uppercase`};
  font-family: sofia-pro,sans-serif;
`;

const StyledText = styled.span`
  text-transform: capitalize;
`;

const Reserved = styled.div``;
const Reprint = styled.div``;
const Promo = styled.div``;
const StyledImage = styled.img`
  width: 100%;
`;

const ManaInfo = styled.span`
  text-align: right;
  float: right;
`;

const Cost = styled.abbr<AbbrProps>`
  ${({ cost }) => cost && `background: url('/img/manacost/${cost}.svg') no-repeat center center`};
  padding: 15px;
  margin: 5px;
  vertical-align: bottom;
`;

const Mana= styled.abbr<AbbrProps>`
  ${({ colorName }) => colorName && `background: url('/img/color/${colorName}.svg') no-repeat center center`};
  padding: 15px;
  margin: 5px;
  vertical-align: bottom;
`;

const Grid = styled.div`
  display: grid; 
  grid-template-columns: .3fr 1fr; 
  gap: 0px 0px; 
  font-family: sofia-pro,sans-serif;
`;

const SingleCard: FC<CardProps> = ({ data }) => {
  // console.log(data);
  const newDate = Intl.DateTimeFormat("fi-FI").format(new Date(data.released_at));
  const cmc = getManaCost(data.mana_cost) as CMCProps[];
  const imageSRC = data.image_uris?.normal || data.image_uris?.png || data.image_uris?.small || data.image_uris?.large || data.image_uris?.border_crop; 
  const prices = Object.keys(data.prices).map((key) => {
    const currency = key.replace('_', ' ');
    const price = data.prices[key];
    return (
      <>
        <StyledB uppercase>
          {currency}
        </StyledB>
        <StyledText>{price}</StyledText>
      </>
  )});
  return (
    <Wrapper>
      <ImageWrapper>
        {imageSRC && <StyledImage
          src={imageSRC}
          alt={data.name}
        />}
      </ImageWrapper>
      <InfoWrapper>
        <Title>
          {data.name}
          <ManaInfo>
            {cmc.map((element) => {
              if (element.type === 'cost') { return <Cost cost={element.title} /> }
              else { return <Mana key={element.title} colorName={element.title}/>}
            })}
          </ManaInfo>
        </Title>
        <Subtitle>{data.type_line}</Subtitle>
        <Description>
          {
            data.oracle_text && data.oracle_text.length > 0 && data.oracle_text.indexOf('\n') > -1 ? (
              data.oracle_text.split('\n').map((text, index) => (
                <React.Fragment key={`${text}-${index}`}>
                  {text}
                  <br />
                </React.Fragment>
              ))
            )
            : data.oracle_text
          }
        </Description>
        <FlavorText>{data.flavor_text}</FlavorText>

        <Subtitle>Extra:</Subtitle>
        <Grid>
          <StyledB>Expansion: </StyledB><StyledText>{data.set_name}</StyledText>
          <StyledB>Rarity: </StyledB><StyledText>{data.rarity}</StyledText>
          <StyledB>Released: </StyledB><StyledText>{newDate}</StyledText>
          <StyledB>Card Number: </StyledB><StyledText>{data.collector_number}</StyledText>
          <StyledB>Illustrated by: </StyledB>
          <Link href={`/search?q=${encodeURIComponent(`a:"${data.artist}"&unique=art`)}`}>
            <StyledLink>{data.artist}</StyledLink>
          </Link>
        </Grid>

        <Subtitle>Prices:</Subtitle>
        <Grid>
          {prices}
        </Grid>
        
        {/* <Reserved>{data.reserved}</Reserved>
        <Reprint>{data.reprint}</Reprint>
        <Promo>{data.promo}</Promo> */}
      </InfoWrapper>
    </Wrapper>
  )
}

export default SingleCard;