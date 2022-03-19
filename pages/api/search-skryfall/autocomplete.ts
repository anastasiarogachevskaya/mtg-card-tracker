// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ name: string }>
) {
  const { q } = req.query;
  const { data } = await axios(`https://api.scryfall.com/cards/autocomplete?q=${q}`);
  res.status(200).json(data);
}
