import { ObjectId } from "mongodb";

type position_type = {
    latitude: string;
    longitude: string;
}
export default class Videocamera {
    constructor(public title: string, public location: number, public position: position_type, public livestream_availability: boolean, public link: string, public _id?: ObjectId) {}
}