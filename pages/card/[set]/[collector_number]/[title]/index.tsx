import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';

import SingleCard from '../../../../../components/SingleCard';
import Container from '../../../../../elements/Container';
import { SingleCardProps } from '../../../../../types/Card/SingleCardProps';
import axios from 'axios';

export default function SingleCardPage({ cardInfo, error }: {cardInfo: SingleCardProps, error: boolean}) {
  if (error) return "An error has occurred.";
  if (!cardInfo) return "Loading...";
  console.log(cardInfo);
  return (
    <Container>
      <Head>
        <title>{cardInfo.name ? cardInfo.name : 'Loading...'} | MTG Invest Portfolio</title>
        <meta name="description" content={cardInfo.oracle_text} />    
      </Head>
      <SingleCard data={cardInfo} />
    </Container>
  )
}

export async function getServerSideProps(context: { params: any; }) {
  const { set: cardSet, collector_number: cardNum } = context.params;
  const { data } = await axios(`${process.env.NEXT_PUBLIC_API_HOST}/api/card?set=${cardSet}&collectorNumber=${cardNum}`);

  return {
    props: {
      cardInfo: data.card[0],
      error: !data ? true : false
    },
  }
}

