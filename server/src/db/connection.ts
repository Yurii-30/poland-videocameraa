/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from "mongodb";

import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

export const db = async() => {
    let connection: any;
    try {
        connection = await client.connect();
        console.log("Connected to the MongoDB Atlas Cluster");
    } catch(e) {
        console.error(e);
    }
    return connection.db(process.env.DB_NAME);
}