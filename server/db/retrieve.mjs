import db from "./connection.mjs";
import { ObjectId } from "mongodb";

let collection_name = "cities";
let coordinates = [];
try {
    let collection = await db.collection(collection_name);
    let results = await collection.find({}).toArray();
    for (let val of results)
        coordinates.push(val.position);
} catch (e) {
    console.error(e);
}

export default coordinates;