
import React from 'react';
import styled from "styled-components";
import Link from 'next/link';
import Image from '../elements/Image';
import { ListingCardProps } from '../types/Card/ListingCardProps';

const Wrapper = styled.article`
  margin: 0.5em;
`;

const ListingCard = ({ image_uris, object, set, collector_number, name }: ListingCardProps) => {
  const placeholderImg = image_uris?.small || './img/placeholder-small.jpg'
  const imageSRC = image_uris?.normal || './img/placeholder.jpg';
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  name = name.toLowerCase().replace(regex, '').replace(' ', '-');
  const link = `/${object}/${set}/${collector_number}/${name}`;
  return (
    <Wrapper>
      <Link href={link}>
        <a>
          <Image
            style={{ width: 277, height: 386 }}
            src={imageSRC}
            placeholderImg={placeholderImg}
          />
        </a>
      </Link>
    </Wrapper>
  )
}

export default ListingCard;