import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, getCardsByPartialString } from '../../../utils/mongoDB-util';


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { q } = req.query;
  let client;
  try {
    client = await connectDatabase();
    try {
      const data = await getCardsByPartialString(client, q, 10, true);
      res.status(200).json(data);
    } catch (error) {
      console.error('No cards found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }
  res.status(200);
}

export default handler;