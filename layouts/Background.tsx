import React from "react";

const Background = () => (
    <>
        <div className="bg-video" />
        <video
            src="./video/register.mp4"
            autoPlay
            loop
            muted
            className="video-css"
            poster="/img/videoPoster.png"
            playsInline
        />
    </>
);

export default Background;
