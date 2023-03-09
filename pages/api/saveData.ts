// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import fs from 'fs';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ msg: string }>
) {
	const { db } = await connectToDatabase();
	const { data } = await axios(
		'https://api.scryfall.com/bulk-data/default_cards'
	);
	const url = data.download_uri; // link to file you want to download
	const path = `bulkdata/${data.id}.json`;
	try {
		if (fs.existsSync(path)) {
			console.log('exists');
			res.status(200).json({ msg: 'No need for update' });
		} else {
			fs.writeFile(path, '', function (err) {
				if (err) throw err;
			});
			const request = https.get(url, (response) => {
				if (response.statusCode === 200) {
					var file = fs.createWriteStream(path);
					response.pipe(file).on('finish', function () {
						res.status(200).json({ msg: 'Success' });
					});
				}
				request.setTimeout(60000, function () {
					// if after 60s file not downlaoded, we abort a request
					request.abort();
				});
			});
			res.status(200).json({ msg: 'File created' });
		}
	} catch (err) {
		console.error(err);
		res.status(400).json({ msg: 'Something went wrong' });
	}
}
