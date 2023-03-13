import type { NextApiRequest, NextApiResponse } from 'next';
import {
	addCardToDeck,
	connectDatabase,
	insertDocument,
} from '../../../utils/mongoDB-util';

export default async function addCardsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the database failed' });
		return;
	}
	if (req.method === 'POST') {
		const { deckIds, card } = req.body;

		try {
			console.log('I AM INSIDE');
			const result = await addCardToDeck(client, deckIds, card);
			return res.status(200).json({ msg: 'ADDED', result });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Creating failed' });
		}
	}

	client.close();
}
