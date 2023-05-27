import React from "react";
import Map from "./Map";
import { useLoadScript } from "@react-google-maps/api";
 
const Main = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    });

    return (isLoaded ? 
        <Map/> :
        <h1>
            Loading...
        </h1> 
    )
}

export default Main;