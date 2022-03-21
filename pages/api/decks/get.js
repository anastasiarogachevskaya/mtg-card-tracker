import { connectDatabase, getDecks } from '../../../utils/mongoDB-util';

async function handler(req, res) {
  const { email } = req.query;
  
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const decks = await getDecks(client, 'decks', email);
      res.status(200).json(decks);
      client.close();
    } catch (error) {
      throw error;
    }
  }

  client.close();
}

export default handler;