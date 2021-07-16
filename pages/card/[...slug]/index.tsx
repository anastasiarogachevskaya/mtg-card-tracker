import axios from 'axios';
import Head from 'next/head'
import React from 'react'
import SingleCard from '../../../components/SingleCard';
import Container from '../../../elements/Container';

export default function SingleCardPage({ cardInfo }) {
  let pageHead = (
    <Head>
      <title>{cardInfo.name ? cardInfo.name : 'Loading...'} | MTG Invest Portfolio</title>
      <meta name="description" content={cardInfo.oracle_text} />    
    </Head>
  )

  return (
    <Container>
      {cardInfo.name && pageHead}
      <SingleCard data={cardInfo} />
    </Container>
  )
}

export async function getServerSideProps(context: { params: any; }) {
  const cardSet = context.params.slug[0];
  const cardNum = context.params.slug[1];
  const { data } = await axios(`https://api.scryfall.com/cards/${cardSet}/${cardNum}`);

  return {
    props: {
      cardInfo: data,
    }, // will be passed to the page component as props
  }
}
