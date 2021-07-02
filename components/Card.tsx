
import React, { FC } from 'react';
import styled from "styled-components";
import Link from 'next/link';
import Image from '../elements/Image';

export type CardProps = {
  data: {
    object: string;
    set: string;
    collector_number: string;
    id: string;
    name: string;
    image_uris: {
      small: string;
      normal: string;
    },
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

const Wrapper = styled.article`
  margin: 0.5em;
`;

const Card: FC<CardProps> = ({ data }) => {
  // console.log(data);
  const placeholderImg = data.image_uris?.small || './img/placeholder-small.jpg'
  const imageSRC = data.image_uris?.normal || './img/placeholder.jpg';
  const link = `/${data.object}/${data.set}/${data.collector_number}/${data.name.toLowerCase().replace(' ', '-')}`;
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