
import React, { FC } from 'react';
import styled from "styled-components";
import Link from 'next/link';
import Image from '../elements/Image';

export type CardProps = {
  id: string;
  object: string;
  set: string;
  collector_number: string;
  name: string;
  image_uris: {
    small: string;
    normal: string;
  },
}

const Wrapper = styled.article`
  margin: 0.5em;
`;

const Card: FC<CardProps> = ({ image_uris, object, set, collector_number, name }) => {
  const placeholderImg = image_uris?.small || './img/placeholder-small.jpg'
  const imageSRC = image_uris?.normal || './img/placeholder.jpg';
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  name = name.toLowerCase().replace(regex, '').replaceAll(' ', '-');
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

export default Card;