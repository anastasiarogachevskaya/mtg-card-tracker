import type { NextApiRequest, NextApiResponse } from 'next';
import { SingleCardProps } from '../../types/Card/SingleCardProps';
import { connectDatabase, getSingleCard } from '../../utils/mongoDB-util';


async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { set, collectorNumber } = req.query;
  let client;
  try {
    client = await connectDatabase();
    try {
      const data = await getSingleCard(client, set, collectorNumber);
      res.status(200).json({
        card: data,
      });
    } catch (error) {
      console.error('No cards found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }
  
}

export default handler;