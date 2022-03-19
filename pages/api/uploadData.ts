// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import type { NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

const getMostRecentFile = (dir: string) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
};

const orderReccentFiles = (dir: string) => {
  return fs.readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};


export default async function handler(
  res: NextApiResponse<{ msg: string }>
) {
  try {
    const { db } = await connectToDatabase();
    const cardData = getMostRecentFile('./bulkdata') as {file: string}; // where to save a file
    const cards = JSON.parse(fs.readFileSync(`bulkdata/${cardData.file}`, 'utf8'));
    db.collection("cards").insert(cards);
    res.status(200).json({ msg: 'Uploaded' });
  } catch (err) {
    console.error(err)
    res.status(400).json({ msg: 'Something went wrong' });
  }
}
