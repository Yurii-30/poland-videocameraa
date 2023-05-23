import React, { useEffect, useState } from "react";
 
const Coordinates = (props) => (
 <div>
    <h1>-------------</h1>
    <h2>{props.lat}</h2>
    <h2>{props.long}</h2>
 </div>
);
 
export default function Main() {
 const [coordinates, setCoordinates] = useState([]);
 
 // This method fetches the records from the database.
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
 
   return;
 }, [coordinates.length]);
 
 // This method will map out the records on the table
 function coordinatesList() {
   return coordinates.map((coordinate) => {
     return (
       <Coordinates
            lat = {coordinate.latitude}
            long = {coordinate.longitude}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
        {coordinatesList()}
   </div>
 );
}