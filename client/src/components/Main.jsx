import React from "react";
import Map from "./Map";
import { useLoadScript } from "@react-google-maps/api";
 
const Main = () => {
    const { isLoaded } = useLoadScript({
        // завантаження сценарію Google Maps API 
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    });
    
    // вибір між екраном завантаження та Google-картою
    return (
        isLoaded ? 
            <Map/> :
            <h1>
                Loading...
            </h1> 
    )
}

export default Main;