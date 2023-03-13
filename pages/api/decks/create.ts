import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, insertDocument } from '../../../utils/mongoDB-util';

interface Deck {
	_id?: string;
	deck: string;
	user: string;
	deckNameStr: string;
	cards: any[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the database failed' });
		return;
	}
	if (req.method === 'POST') {
		const { deck, user } = req.body;
		const deckNameStr = deck.replace(/\s+/g, '-').toLowerCase();
		if (!deck || deck.trim() === '' || !user || user.trim() === '') {
			res.status(422).json({ message: 'Invalid input' });
			return;
		}
		const newDeck: Deck = {
			deck,
			user,
			deckNameStr,
			cards: [],
		};
		let result;
		try {
			result = await insertDocument(client, 'decks', newDeck);
			newDeck._id = result.insertedId;
			res.status(201).json({ message: 'Deck created', deck: newDeck });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Creating failed' });
		}
	}

	client.close();
}

export default handler;
