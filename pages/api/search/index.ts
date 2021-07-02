// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { q } = req.query;
  const { data } = await axios(`https://api.scryfall.com/cards/search/?q=${q}`);
  res.status(200).json(data);
}
