import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db('magic');
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getDecks(client, collection, email) {
  const db = client.db();
  const decks = await db
    .collection(collection)
    .find()
    .toArray();
  return decks;
}