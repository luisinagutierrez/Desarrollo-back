import { MongoClient, Db } from "mongodb"; //it is done once for app

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";

const client = new MongoClient(uri);

await client.connect();

export let db:Db = client.db("Ecommerce2023");