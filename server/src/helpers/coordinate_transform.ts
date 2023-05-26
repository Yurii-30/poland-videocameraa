import { ObjectId } from "mongodb";
import { retrieve_data } from "../db/retrieve"; 

interface DD_Coordinates {
    _id: ObjectId,
    latitude: number,
    longitude: number
}

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
    const DMS_coordinates = await retrieve_data();
    const DD_geo_coords = [];
    for (let i = 0; i < DMS_coordinates.length; i++) {
        const DD_position: DD_Coordinates = {
            _id: DMS_coordinates[i]._id,
            latitude: DMS_to_DD(DMS_coordinates[i].position.latitude),
            longitude: DMS_to_DD(DMS_coordinates[i].position.longitude)
        };
        DD_geo_coords.push(DD_position);
    }
    return DD_geo_coords;
}