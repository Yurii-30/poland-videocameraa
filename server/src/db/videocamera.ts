import { ObjectId } from "mongodb";
// ObjectId є унікальним ідентифікатором для кожного документа

// створення індивідувального типу даних position_type 
type position_type = {
    latitude: string;
    longitude: string;
}

// визначення класу Videocamera 
export default class Videocamera {
    constructor(public title: string, public location: string, public position: position_type, public livestream_availability: boolean, public link: string, public _id?: ObjectId) {}
}