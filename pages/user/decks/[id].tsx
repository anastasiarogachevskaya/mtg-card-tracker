import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { ListingCardProps } from '../../../types/Card/ListingCardProps';
import ResultList from '../../../components/ResultList';

interface Deck {
	_id: string;
	deck: string;
	cards: ListingCardProps[];
}

const Deck = ({ deck, error }: { deck: Deck; error?: string }) => {
	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!deck) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Deck: {deck.deck}</h1>
			<ResultList listing={deck.cards} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;
	console.log(`Get server side ${id}`);
	const session = await getSession(context);

	if (!session) {
		return { redirect: { destination: '/', permanent: false } };
	}
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_HOST}/api/decks/${id}`
		);
		const deck = response.data;

		if (deck && deck.user !== session?.user?.email) {
			return { notFound: true };
		}
		console.log(`Get server side ${deck.deck}`);

		return { props: { deck } };
	} catch (error) {
		console.error(error);
		return { props: { deck: null } };
	}
};

export default Deck;
