import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import useSWR, { SWRResponse } from 'swr';

import SingleCard from '../../../../../components/SingleCard';
import Container from '../../../../../elements/Container';
import { SingleCardProps } from '../../../../../types/Card/SingleCardProps';

export default function SingleCardPage({ cardSet, cardNum}: { cardSet: string, cardNum: string }) {
  const [cardInfo, setCardInfo] = useState<SingleCardProps>();
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/api/card?set=${cardSet}&collectorNumber=${cardNum}`);
  useEffect(() => {
    if (data) {
      setCardInfo(data.card[0]);
    }
  }, [data]);
  if (error) return "An error has occurred.";
  if (!cardInfo) return "Loading...";
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

  return {
    props: {
      cardSet,
      cardNum,
    },
  }
}

