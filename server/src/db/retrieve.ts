import { ObjectId } from "mongodb";
import { collections } from "./database.service";
import Videocamera from "./videocamera";

// створення нового типу даних, аналогу об’єкта в MongoDB 
type position_format = {
    latitude: string,
    longitude: string
}

//визначення інтерфейсу для заповнення масивів маркерів 
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
        //отримання документів з колекції 
        const results = (await collections.cities?.find({}).toArray()) as unknown as Videocamera[]; 
        for (const val of results){
            //приведення до стандартизованого виду через інтерфейс marker_attributes	 
            const marker: marker_attributes = {
                _id: new ObjectId(val._id),
                title: val.title,
                location: val.location,
                position: val.position,
                livestream_availability: val.livestream_availability,
                link: val.link
            }
            //занесення отриманого значення до масиву markers 
            markers.push(marker)
        }
    } catch (e) {
        console.error(e);
    }
    return markers;
}

