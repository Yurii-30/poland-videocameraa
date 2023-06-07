import { useState, useEffect } from "react";

const PhotoStreamingWindow = (props) => {
    const [title, setTitle] = useState(props.title);
    const [location, setLocation] = useState(props.location);
    const [photoURL, setPhotoURL] = useState(props.link);

    useEffect(() => {
        console.log("Title of the photo: ", title);
        console.log("Location of the photo: ", location);
        console.log("URL of the photo: ", photoURL);
    },[]);

    return (
        <div className = "border-black">
            <img src = {photoURL} width = "640px" height = "480px"/>
        </div>
    );
}

export default PhotoStreamingWindow;