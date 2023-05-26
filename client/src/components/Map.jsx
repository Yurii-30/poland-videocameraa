import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import styles from "./map_styles.css";
import { useMemo } from "react";
import { useEffect, useState } from "react";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    });
    const geo_center_Poland = process.env.REACT_APP_POLAND_GEO_CENTER.split(',');
    const geo_center = useMemo(() => ({ lat: parseFloat(geo_center_Poland[0]), lng: parseFloat(geo_center_Poland[1]) }), []);
    const [markerCoordinates, setMarkerCoordinates] = useState([]);
    useEffect(() => {
        async function getMarkerCoordinates() {
          const response = await fetch(`http://localhost:5050/`);
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          
          const coords = await response.json();
          console.log(coords);
          setMarkerCoordinates(coords);
        }

          getMarkerCoordinates();
       }, [markerCoordinates.length]);
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
                    >
                        {
                            markerCoordinates.map(({_id, latitude, longitude}) => (
                                <Marker position = {{latitude, longitude}}/>
                            ))
                        }
                    </GoogleMap>
                )
            }
        </div>
    );
}

export default Map;