import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });
  return client.connect();
}

export async function insertDocument(client, collection, document) {
  const db = client.db('magic');
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getDecks(client, collection, email) {
  const db = client.db('magic');
  const decks = await db
    .collection(collection)
    .find({ user: email })
    .toArray();
  return decks;
}

export async function getCardsByPartialString(client, q, limit = 0, namesOnly = false) {
  const filter = (q === undefined || q.length < 1) ? {} : { name: { $regex: q, $options: 'i' } };
  const cards = await client
    .db('magic')
    .collection('cards')
    .find(
      filter,
    )
    .limit(limit)
    .toArray();
  client.close();
  if (namesOnly) {
    return cards.map(card => card.name);
  }
  return cards;
}

export async function getSingleCard(client, set, collectorNumber) {
  const card = await client
    .db('magic')
    .collection('cards')
    .find(
      {
        set: set,
        collector_number: collectorNumber,
      },
    )
    .toArray();
  client.close();
  return card;
}