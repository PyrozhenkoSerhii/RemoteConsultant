import React from 'react'


const VideoPlayer = ({isStreaming}) => (
    <div className='video-wrapper'>
        {/* <div className="text-center">
            <video id="my-camera" width="300" height="300" autoPlay="autoplay" muted={true} className="mx-auto d-block"></video>
            <span className="label label-info">You</span>
        </div> */}

        <video id="peer-camera" style={{opacity: isStreaming ? '1' : '0'}} autoPlay="autoplay" controls={isStreaming} ></video>
    </div>
)


export default VideoPlayer