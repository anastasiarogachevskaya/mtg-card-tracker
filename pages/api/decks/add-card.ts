import type { NextApiRequest, NextApiResponse } from 'next';
import { addCardToDeck, connectDatabase } from '../../../utils/mongoDB-util';
import { MongoClient } from 'mongodb';

export default async function addCardsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let client: MongoClient;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the database failed' });
		return;
	}

	if (req.method === 'POST') {
		const { deckIds, card } = req.body;

		console.log('deckIds', deckIds);

		try {
			const results = await Promise.all(
				deckIds.map(async (deckId: string) => {
					return await addCardToDeck(client, deckId, card);
				})
			);

			return res.status(200).json({ msg: 'ADDED', results });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Creating failed' });
		}
	}

	client.close();
}
