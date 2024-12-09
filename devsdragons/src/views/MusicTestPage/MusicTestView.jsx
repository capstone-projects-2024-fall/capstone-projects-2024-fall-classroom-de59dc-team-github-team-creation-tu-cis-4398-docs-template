import React, { useEffect, useState, useRef } from "react";
import BackgroundMusic from "../../components/Music/BackgroundMusic";

const MusicTestView = () => {
    const musicRef = useRef(null); //keep music playing 
    const [isStarted, setIsStarted] = useState(false); // Track if the user has interacted
    //() there will be an error without any user interaction so I've added a play music button)

    useEffect(() => {
        if (isStarted && !musicRef.current) {
            musicRef.current = new BackgroundMusic("/game_music.mp3");
            musicRef.current.play(); // Plays  music after user interaction
        }

        // Cleanup: Stop music when the user leaves the view
        return () => {
            if (musicRef.current) {
                musicRef.current.stop();
            }
        };
    }, [isStarted]); 

    const handleStartMusic = () => {
        setIsStarted(true); 
    };

    return (
        <div>
             <button onClick={handleStartMusic}
             style={{ position: 'absolute', top: '10px', left: '10px' }}
             >Start Music</button>     
        </div>
    );
    
};

export default MusicTestView;
