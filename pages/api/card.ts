// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ name: string }>
) {
  const { set, number } = req.query;
  const { data } = await axios(`https://api.scryfall.com/cards/${set}/${number}`);
  res.status(200).json(data);
  res.status(200);
}
