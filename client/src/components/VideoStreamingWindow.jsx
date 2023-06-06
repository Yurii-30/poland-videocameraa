import { useState, useEffect} from "react";
import ReactPlayer from "react-player";

const VideoStreamingWindow = (props) => {
    const [ videoURL, setVideoURL ] = useState(props.link);

    useEffect(() => {
        console.log("Link to the video: ", videoURL);
    },[])
    return (
        <div className = "border-black">
            <video src = {videoURL} type = "video/mp4" width = "100%">
                Sorry, your browser doesn't support the embedded video
            </video>
        </div>
        
    );

}

export default VideoStreamingWindow;
