import { GoogleMap, Marker, InfoWindowF } from "@react-google-maps/api";
import styles from "./map_styles.css";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import VideoStreamingWindow from "./VideoStreamingWindow";

const Map = () => {
    // Оголошення змінних стану та їхнього початкового значення
    const [markerCoordinates, setMarkerCoordinates] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [mapReference, setMapReference] = useState();
    const [infoWindowF, setInfoWindowF] = useState();
    const [videoStreamingWindow, setVideoStreamingWindow] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const geo_center_Poland = process.env.REACT_APP_POLAND_GEO_CENTER.toString().split(',');
    const geo_center = useMemo(() => ({ lat: parseFloat(geo_center_Poland[0]), lng: parseFloat(geo_center_Poland[1]) }), []);
    /*
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };
    */

    /*
    const handleOnLoading = (map) => {
        setMapReference(map);
        const bounds = new window.google.maps.LatLngBounds();
        markerCoordinates?.forEach(({ latitude, longitude }) => 
            bounds.extend({ latitude, longitude }));
        map.fitBounds(bounds);
    }
    */

    const handleMarkerClick = (id, title, location, lat, lng) => {
        mapReference?.panTo({lat, lng});
        setIsOpen(true);
        setIsPreview(false);
        setInfoWindowF({ id, title, location });
    };

    const handleMarkerDoubleClick = (id, livestream_availability, link) => {
        setIsPreview(true);
        setVideoStreamingWindow({ id, livestream_availability, link });
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
        <div className = "h-full w-1 text-3xl font-bold underline">
        {
            // 
            isPreview &&
            <div>
                <VideoStreamingWindow
                    link = {videoStreamingWindow.link}
                />
            </div>
        }
        {
            !isPreview &&
            <GoogleMap
                center = {geo_center}
                zoom = {6.5}
                onClick = {() => setActiveMarker(null)}
                mapContainerClassName = "map-container"
            >
            {
                markerCoordinates?.map(({ _id, title, location, latitude, longitude, livestream_availability, link }) => ( 
                <Marker
                    key = {_id} 
                    position = {{lat: latitude, lng: longitude}}
                    icon={{
                        path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        fillOpacity: 1,
                        fillColor: "#fcfafa",
                        strokeColor: "#f00c1b",
                        scale: 5,
                    }}
                    onClick = {() => {
                        handleMarkerClick(_id, title, location, latitude, longitude);
                    }}
                    onDblClick = {() => {
                        handleMarkerDoubleClick(_id, livestream_availability, link);
                    }}
                >
                {
                    isOpen && infoWindowF.id === _id && (
                        <InfoWindowF
                            onCloseClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            <h2>{infoWindowF.title}, {infoWindowF.location}</h2>
                        </InfoWindowF>
                    )
                }
                </Marker>
                )) 
            }
            </GoogleMap>
        }
        </div>
    );
}

export default Map;