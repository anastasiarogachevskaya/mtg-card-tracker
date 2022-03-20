import type { NextApiRequest, NextApiResponse } from 'next';
import { SingleCardProps } from '../../../types/Card/SingleCardProps';
import { connectDatabase, getCardsByPartialString } from '../../../utils/mongoDB-util';


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ 
    total_cards?: number,
    cards?: SingleCardProps[],
    message?: string
  }>
) {
  const { q } = req.query;
  console.log('q', q);
  let client;
  try {
    client = await connectDatabase();
    try {
      const data = await getCardsByPartialString(client, q);
      res.status(200).json({
        total_cards: data.length,
        cards: data,
      });
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