import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { cities?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.ATLAS_URI as string);
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME as string);
    const citiesCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME as string);
    collections.cities = citiesCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${citiesCollection.collectionName}`);
 }