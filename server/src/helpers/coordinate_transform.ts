import { ObjectId } from "mongodb";
import { retrieve_data } from "../db/retrieve"; 

//визначення інтерфейсу подання даних про відеокамери
interface videocamera_format {
    _id: ObjectId,
    title: string,
    location: string,
    latitude: number,
    longitude: number,
    livestream_availability: boolean,
    link: string
}

//оголошення функції, яка перетворює географічні координати з формату градуси/хвилини/секунди у формат десяткових градусів 
function DMS_to_DD (DMS_coordinate: string): number {
    const units = ['°', '\'', '"'];
    let processed_DMS_coordinate = DMS_coordinate;
    let sum = 0.0;
    let fact = 1.0;
    for (let y = 0; y < 3; y++) {
        sum += parseFloat(processed_DMS_coordinate.split(units[y])[0])/fact;
        fact *= 60;
        processed_DMS_coordinate = processed_DMS_coordinate.split(units[y])[1];
    }

    if (processed_DMS_coordinate[processed_DMS_coordinate.length - 1] == 'S' || processed_DMS_coordinate[processed_DMS_coordinate.length - 1] == 'W')
        sum *= -1.0;
    return parseFloat(sum.toFixed(6));
}
export async function coordinates_transformation() {
    //отримання стандартизованих даних про маркери
    const initial_videocameras = await retrieve_data();
    const final_videocameras = [];
    for (let i = 0; i < initial_videocameras.length; i++) {
        const videocamera: videocamera_format = {
            _id: initial_videocameras[i]._id,
            title: initial_videocameras[i].title,
            location: initial_videocameras[i].location,
            latitude: DMS_to_DD(initial_videocameras[i].position.latitude), //перетворення широти
            longitude: DMS_to_DD(initial_videocameras[i].position.longitude), //перетворення довготи
            livestream_availability: initial_videocameras[i].livestream_availability,
            link: initial_videocameras[i].link
        };
        final_videocameras.push(videocamera); //занесення до масиву даних про відеокамери
    }
    return final_videocameras;
}