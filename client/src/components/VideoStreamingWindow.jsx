import { useState, useEffect} from "react";
import ReactPlayer from "react-player";

const VideoStreamingWindow = (props) => {
    const [ videoURL, setVideoURL ] = useState(props.link);
    return (
        <div>
            {
                <ReactPlayer
                    className = "react-player"
                    url = {videoURL}    
                    width = "100%"
                    height = "75%"
                    controls
                    playing
                />
            }
            
        </div>
        
    );

}

export default VideoStreamingWindow;
