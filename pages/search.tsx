import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import ResultList from '../components/ResultList';
import axios from 'axios';
import { ListingCardProps } from '../types/Card/ListingCardProps';

type SearchProps = {
  searchQuery: string;
  totalCards: number;
  cardListing: ListingCardProps[]
  error: boolean;
}


const SearchResultsPage = ({
  searchQuery, totalCards, cardListing, error,
}: SearchProps) => {
  let pageHead;

  if (error) {
    pageHead = (
      <Head>
        <title>Error | MTG Portfolio</title>
        <meta name="description" content="Error" />
      </Head>
    );
  } else {
    <Head>
      <title>Search: {searchQuery} | MTG Portfolio</title>
      <meta name="description" content={`Found cards by query ${searchQuery}`} />
    </Head>
  }

  return (
    <Fragment>
      {pageHead}
      {error
        ? <p>Something went wrong. Please try again later.</p>
        : 
        <>
          <h2>Total cards: {totalCards}</h2>
          <ResultList listing={cardListing} /> 
        </>
      }
    </Fragment>
  );
};

export default SearchResultsPage;

export async function getServerSideProps(context: { query: { q: string }; }) {
  const { q } = context.query;
  const { data } = await axios(`${process.env.NEXT_PUBLIC_API_HOST}/api/search?q=${q}`);
  const { total_cards: totalCards, cards } = data;
  console.log(totalCards);

  return {
    props: {
      searchQuery: q,
      totalCards,
      cardListing: cards,
      error: !data ? true : false,
    },
  }
}
