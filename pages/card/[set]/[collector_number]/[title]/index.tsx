import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

import SingleCard from '../../../../../components/SingleCard';
import Container from '../../../../../elements/Container';
import { SingleCardProps } from '../../../../../types/Card/SingleCardProps';
import Spacer from '../../../../../elements/ui/Spacer';
import Modal from '../../../../../components/Modal';
import ButtonEl from '../../../../../elements/form/Button';
import RoundButton from '../../../../../elements/form/RoundButton';

type SingleCardPageProps = {
  cardInfo: SingleCardProps;
  error: boolean;
  auth: boolean;
  decks: { deck: string; _id: string; }[];
  setIsOpen: (e: boolean) => void;
};

export default function SingleCardPage(
  { cardInfo, error, auth, decks }: SingleCardPageProps) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    if(!showModal)
      setShowModal(true);
  }
  if (error) return "An error has occurred.";
  if (!cardInfo) return "Loading...";
  return (
    <Container>
      <Head>
        <title>{cardInfo.name ? cardInfo.name : 'Loading...'} | MTG Invest Portfolio</title>
        <meta name="description" content={cardInfo.oracle_text} />    
      </Head>
      {showModal && <Modal setIsOpen={setShowModal} cardInfo={cardInfo} decks={decks}/>}
      <SingleCard data={cardInfo} />
      <Spacer size="1em 0 0 0" />
        {auth && (
        <RoundButton onClick={onClick} />
        )}
    </Container>
  )
}

export async function getServerSideProps(context: { req: NextApiRequest, params: any; }) {
  const { set: cardSet, collector_number: cardNum } = context.params;
  const { req } = context;
  const session = await getSession({ req })
  const { data: decks} = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/decks/get?email=${session?.user!.email}`);
  decks.map((deck: { name: string; _id: string; }) => {
    return {
      deckName: deck.name,
      deckId: deck._id,
    }
  });
  const { data } = await axios(`${process.env.NEXT_PUBLIC_API_HOST}/api/card?set=${cardSet}&collectorNumber=${cardNum}`);

  return {
    props: {
      cardInfo: data.card[0],
      auth: session ? true : false,
      decks: session ? decks : [],
      error: !data ? true : false
    },
  }
}

