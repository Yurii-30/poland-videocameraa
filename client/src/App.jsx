import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Main from "./components/Main";
 
const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<Main />} />
     </Routes>
   </div>
 );
};

export default App;