import axios from 'axios';
import Head from 'next/head'
import React from 'react'
import SingleCard from '../../../components/SingleCard';
import Container from '../../../elements/Container';
import { SingleCardProps } from '../../../types/Card/SingleCardProps';

export default function SingleCardPage({ cardInfo, meta }: { cardInfo: SingleCardProps, meta: { title: string, description: string} }) {
  let pageHead = (
    <Head>
      <title>{meta.title ? meta.title : 'Loading...'} | MTG Invest Portfolio</title>
      <meta name="description" content={meta.description} />    
    </Head>
  )

  return (
    <Container>
      {meta?.title && pageHead}
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
      meta: {
        title: data.name,
        description: data.oracle_text
      }
    }, // will be passed to the page component as props
  }
}
