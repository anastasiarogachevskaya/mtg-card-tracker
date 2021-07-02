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
  const { data, error } = useSWR(`/api/search?q=${searchQuery}`);

  useEffect(() => {
    if (data) {
      setTotalCards(data.total_cards);
      setHasMore(data.has_more);
      setCardListing(data.data);
    }
  }, [data]);

  let pageHead = (
    <Head>
      <title>Search: {searchQuery} | MTG Portfolio</title>
      <meta name="description" content={`Found cards by query ${searchQuery}`} />
    </Head>
  );

  return (
    <Fragment>
      {pageHead}
      <h2>Total cards: {totalCards}</h2>
      <ResultList listing={cardListing} /> 
    </Fragment>
  );
}

export default SearchResultsPage;