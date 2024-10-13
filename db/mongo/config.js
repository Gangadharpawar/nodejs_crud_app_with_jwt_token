import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_CONNECTION);

export async function connectDB() {
  //mongodb connection
  await client.connect();
  return client;
}

export function getDB() {
  //retern database
  return client.db("tododb");
}
