import { ObjectId } from "mongodb";
import { collections } from "./database.service";
import Videocamera from "./videocamera";

type position_format = {
    latitude: string,
    longitude: string
}
interface marker_attributes {
    _id: ObjectId;
    position: position_format;
}

export async function retrieve_data() {
    
    const markers = [];
    try {
        const results = (await collections.cities?.find({}).toArray()) as unknown as Videocamera[];
        for (const val of results) {
            console.log("Document properties: ", val);
            console.log("Type of _id: ", typeof val._id);
            console.log("Value of _id: ", val._id);
            console.log("---------------------");
            const marker: marker_attributes = {
                _id: new ObjectId(val._id),
                position: val.position
            }
            markers.push(marker)
        }
    } catch (e) {
        console.error(e);
    }
    return markers;
}

