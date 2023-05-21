import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let connection;
try {
  connection = await client.connect();
  console.log("Connected to the poland_videocameras db");
} catch(e) {
  console.error(e);
}

let db = connection.db("poland_videocameras");

export default db;