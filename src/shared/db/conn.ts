import { MongoClient } from "mongodb"; //it is done once for app

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "Ecommerce2023";

const client = new MongoClient(uri);

await client.connect();

export const db = client.db(dbName);