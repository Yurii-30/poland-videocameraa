import React, { useEffect, useState } from "react";
import MapView from "./MapView";
import Map from "./Map";
 
const Main = () => {
 const [coordinates, setCoordinates] = useState([]);
 
 // This method fetches the records from the database.
 /*
 useEffect(() => {
  async function getCoordinates() {
    const response = await fetch(`http://localhost:5050/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    
    const coords = await response.json();
    console.log(coords);
    setCoordinates(coords);
  }

  getCoordinates();
 }, [coordinates.length]);
 */
 
 /*
 const coordinatesList = () => {
  return coordinates.map((coordinate) => {
    return (
    <MapView
      lat = {coordinate.latitude}
      long = {coordinate.longitude}
    />)
  });
  */
 return (
  <Map/>
 );
}

export default Main;