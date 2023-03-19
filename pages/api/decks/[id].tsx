import { connectDatabase, findDeckById } from '../../../utils/mongoDB-util';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end(); // Method Not Allowed
	}

	const deckId = req.query.id as string;
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Connecting to the database failed' });
	}

	let deck;

	try {
		deck = await findDeckById(client, deckId);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Error finding deck' });
	}

	if (!deck) {
		return res.status(404).json({ message: 'Deck not found' });
	}
	res.status(200).json(deck);
}

export default handler;
