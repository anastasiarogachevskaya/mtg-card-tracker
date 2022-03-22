
import React, { Fragment, useState } from 'react';
import styled from "styled-components";
import getManaCost from '../utils/getManaCost';
import { device } from '../constants/breakpoints';
import Link from 'next/link';
import StyledLink from '../elements/StyledLink';

import { AbbrProps, BProps, CMCProps, SingleCardProps } from '../types/Card/SingleCardProps';

const Wrapper = styled.article`
  width: 100%;
  background: ${({ theme }) => theme.primary.underBgColor};
  transition: all 0.50s linear;
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

const ButtonFloater = styled.div`
  position: absolute;
  right: 0;
  filter: opacity(.3);
  transition: filter .3s ease-in-out;
  
  &:hover {
    filter: opacity(1);
  }
`;

const SingleCard = ({ data }:{ data: SingleCardProps }) => {
  const {
    released_at, name, type_line, oracle_text, flavor_text, mana_cost,
    image_uris, set_name, rarity, collector_number, prices, artist,
  } = data;
  // const newDate = Intl.DateTimeFormat("fi-FI").format(new Date(released_at));
  const cmc = getManaCost(mana_cost) as CMCProps[];
  const imageSRC = image_uris?.normal || image_uris?.png || image_uris?.small || image_uris?.large || image_uris?.border_crop; 
  const priceGrid = Object.keys(prices).map((key) => {
    const currency = key.toString().replace('_', ' ');
    const price = prices[key];
    return (
      <React.Fragment key={price + key}>
        <StyledB uppercase>
          {currency}
        </StyledB>
        <StyledText>{price}</StyledText>
      </React.Fragment>
  )});

  return (
    <Wrapper>
      <ImageWrapper>
        {imageSRC && <StyledImage
          src={imageSRC}
          alt={name}
        />}
      </ImageWrapper>
      <InfoWrapper>
        <Title>
          {name}
          <ManaInfo>
            {cmc.map((element) => {
              if (element.type === 'cost') { return <Cost key={element.title} cost={element.title} /> }
              else { return <Mana key={element.title} colorName={element.title}/>}
            })}
          </ManaInfo>
        </Title>
        <Subtitle>{type_line}</Subtitle>
        <Description>
          {
            oracle_text && oracle_text.length > 0 && oracle_text.indexOf('\n') > -1 ? (
              oracle_text.split('\n').map((text, index) => (
                <Fragment key={`${text}-${index}`}>
                  {text}
                  <br />
                </Fragment>
              ))
            )
            : oracle_text
          }
        </Description>
        <FlavorText>{flavor_text}</FlavorText>

        <Subtitle>Extra:</Subtitle>
        <Grid>
          <StyledB>Expansion: </StyledB><StyledText>{set_name}</StyledText>
          <StyledB>Rarity: </StyledB><StyledText>{rarity}</StyledText>
          <StyledB>Released: </StyledB><StyledText>{released_at}</StyledText>
          <StyledB>Card Number: </StyledB><StyledText>{collector_number}</StyledText>
          <StyledB>Illustrated by: </StyledB>
          <Link href={`/search?q=${encodeURIComponent(`a:"${artist}"&unique=art`)}`}>
            <StyledLink>{artist}</StyledLink>
          </Link>
        </Grid>

        <Subtitle>Prices:</Subtitle>
        <Grid>
          {priceGrid}
        </Grid>
        
        {/* <Reserved>{data.reserved}</Reserved>
        <Reprint>{data.reprint}</Reprint>
        <Promo>{data.promo}</Promo> */}
      </InfoWrapper>
    </Wrapper>
  )
}

export default SingleCard;