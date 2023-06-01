import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// визначення колекції cities
export const collections: { cities?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    // визначення клієнта MongoDB
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.ATLAS_URI as string); 
    try {
        await client.connect(); // підключення до кластеру MongoDB Atlas  
        console.log("Connected to the MongoDB Atlas Cluster");
    } catch(e) {
        console.error(e);
    }
    const db: mongoDB.Db = client.db(process.env.DB_NAME as string); //визначення БД
    const citiesCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME as string); //визначення колекції з БД
    collections.cities = citiesCollection; // присвоєння колекції cities значенню отриманої колекції з БД
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${citiesCollection.collectionName}`);
 }