import { MongoClient } from 'mongodb';

/**
 * Testing purposes only
 */ 

export async function listDatabases() {
  const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
  client.connect()
    .then(client =>
      client
        .db()
        .admin()
        .listDatabases() // Returns a promise that will resolve to the list of databases
    )
    .then(dbs => {
      console.log("Mongo databases", dbs);
    })
    .finally(() => client.close());
}