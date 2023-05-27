import { ObjectId } from "mongodb";
import { collections } from "./database.service";
import Videocamera from "./videocamera";

type position_format = {
    latitude: string,
    longitude: string
}
interface marker_attributes {
    _id: ObjectId;
    title: string;
    location: string;
    position: position_format;
    livestream_availability: boolean;
    link: string;
}

export async function retrieve_data() {
    
    const markers = [];
    try {
        const results = (await collections.cities?.find({}).toArray()) as unknown as Videocamera[];
        for (const val of results){
            const marker: marker_attributes = {
                _id: new ObjectId(val._id),
                title: val.title,
                location: val.location,
                position: val.position,
                livestream_availability: val.livestream_availability,
                link: val.link
            }
            markers.push(marker)
        }
    } catch (e) {
        console.error(e);
    }
    return markers;
}

