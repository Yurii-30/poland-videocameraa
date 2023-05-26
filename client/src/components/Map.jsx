import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import styles from "./map_styles.css";
import { useMemo } from "react";
import { useEffect, useState } from "react";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    });
    const geo_center_Poland = process.env.REACT_APP_POLAND_GEO_CENTER.split(',');
    console.log("Here is a Google API Key: ", process.env.REACT_APP_GOOGLE_API_KEY);
    console.log("Variable isLoaded = ", isLoaded);
    console.log("Center Latitude: ", parseFloat(geo_center_Poland[0]));
    console.log("Center Longitude: ", parseFloat(geo_center_Poland[1]));
    console.log("************************");
    const geo_center = useMemo(() => ({ lat: parseFloat(geo_center_Poland[0]), lng: parseFloat(geo_center_Poland[1]) }), []);
    return (
        <div className = "text-3xl font-bold underline">
            {
                !isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName = "map-container"
                        center = {geo_center}
                        zoom = {7.5}
                    />
                )
            }
        </div>
    );
}

export default Map;