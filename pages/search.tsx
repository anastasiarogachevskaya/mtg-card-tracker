import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ResultList from '../components/ResultList';
import useSWR from 'swr';

const SearchResultsPage = () => {
  const router = useRouter();
  const searchQuery = router.query.q;
  const [totalCards, setTotalCards] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [cardListing, setCardListing] = useState([]);
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/api/search?q=${searchQuery}`);
  let pageHead;

  useEffect(() => {
    if (data) {
      setTotalCards(data.total_cards);
      setHasMore(data.has_more);
      setCardListing(data.cards);
    }
  }, [data]);

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
