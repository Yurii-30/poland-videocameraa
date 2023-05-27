import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import styles from "./map_styles.css";
import { useMemo } from "react";
import { useEffect, useState } from "react";

const Map = () => {
    const [markerCoordinates, setMarkerCoordinates] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const geo_center_Poland = process.env.REACT_APP_POLAND_GEO_CENTER.split(',');
    const geo_center = useMemo(() => ({ lat: parseFloat(geo_center_Poland[0]), lng: parseFloat(geo_center_Poland[1]) }), []);
    
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };
    
    const handleOnLoading = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markerCoordinates?.forEach(({ latitude, longitude }) => 
            bounds.extend({ latitude, longitude }));
        map.fitBounds(bounds);
    }

    useEffect(() => {
        async function getMarkerCoordinates() {
          const response = await fetch(`http://localhost:5050/`);
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const coords = await response.json();
          console.log("Initial coordinates in React: ", coords);
          setMarkerCoordinates(coords);
          console.log("Marker coordinates in React: ", markerCoordinates);
        }

        getMarkerCoordinates();


    }, [markerCoordinates.length]);

    return (
        <div className = "text-3xl font-bold underline">
            <GoogleMap
                onLoad={handleOnLoading}
                mapContainerClassName = "map-container"
            >
            {           
                markerCoordinates?.map(({ _id, latitude, longitude }) => ( 
                    <Marker
                        key = {_id} 
                        position = {{lat: latitude, lng: longitude}}
                    />
                ))
            }
            </GoogleMap>
        
        </div>
    );
}

export default Map;