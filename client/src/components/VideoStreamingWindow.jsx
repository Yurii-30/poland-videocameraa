import { useState, useEffect} from "react";
import ReactPlayer from "react-player";

const VideoStreamingWindow = (props) => {
    const [ videoURL, setVideoURL ] = useState(props.link);

    useEffect(() => {
        console.log("Link to the video: ", videoURL);
    },[])
    return (
        <div className = "border-black">
            <ReactPlayer
                className = "react-player"
                url = {videoURL}    
                width = "1380px"
                height = "680px"
                controls
                playing
            />
        </div>
        
    );

}

export default VideoStreamingWindow;
