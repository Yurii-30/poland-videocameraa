import { collections } from "./database.service";
import Videocamera from "./videocamera";

export async function retrieve_data() {
    const coordinates = [];
    try {
        const results = (await collections.cities?.find({}).toArray()) as unknown as Videocamera[];
        for (const val of results)
            coordinates.push(val.position);
    } catch (e) {
        console.error(e);
    }
    return coordinates;
}

