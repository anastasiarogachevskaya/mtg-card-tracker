import fs from 'fs';
import path from 'path';
import type { NextApiResponse, NextApiRequest } from 'next';
import clientPromise from '../../lib/mongodb';

const getMostRecentFile = (dir: string) => {
	const files = orderReccentFiles(dir);
	return files.length ? files[0] : undefined;
};

const orderReccentFiles = (dir: string) => {
	return fs
		.readdirSync(dir)
		.filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
		.map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
		.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ msg: string }>
) {
	try {
		const client = await clientPromise;
		const db = client.db('magic');
		const cardData = getMostRecentFile('./bulkdata') as { file: string }; // where to save a file
		const cards = JSON.parse(
			fs.readFileSync(`bulkdata/${cardData.file}`, 'utf8')
		);
		await db.collection('cards').insertMany(cards);
		return res.status(200).json({ msg: 'Uploaded' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ msg: 'Something went wrong' });
	}
}
