import React, { useState, useEffect, useRef } from "react";
import GamingCentre from "./GamingCentre";
import "./GamingHub.css";

const GamingHub = () => {
    const [showContent, setShowContent] = useState(false);
    const videoRef = useRef(null);

    const handleVideoEnd = () => {
        setShowContent(true);
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.playbackRate = 2.0; // Speed up the video by 2 times

            const cropDuration = 10; // Duration to play in seconds
            const handleTimeUpdate = () => {
                if (videoElement.currentTime >= cropDuration) {
                    videoElement.pause();
                    handleVideoEnd();
                }
            };

            videoElement.addEventListener("timeupdate", handleTimeUpdate);
            return () => {
                videoElement.removeEventListener(
                    "timeupdate",
                    handleTimeUpdate
                );
            };
        }
    }, []);

    return (
        <div className="w-full  bg-bgWhite">
            {!showContent ? (
                <div className="video-container">
                    <video
                        ref={videoRef}
                        width="100%"
                        autoPlay
                        muted
                        playsInline
                    >
                        <source
                            src="https://res.cloudinary.com/du41brgak/video/upload/v1719473394/Gamer_StockVoyager/ljatsojujyzhq7m1ota0.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <div className="bulge-in bg-bgWhite">
                    <div className="w-11/12 bg-white rounded-md shadow-md mx-auto my-10 h-2/3">
                        <div className="text-center font-bold text-8xl w-full">
                            GAMING HUB
                        </div>
                        <GamingCentre />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamingHub;
