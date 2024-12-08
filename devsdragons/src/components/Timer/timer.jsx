import React, { useState, useRef, useEffect } from "react";

const Timer = ({ TIME = "00:01:00", onTimeout }) => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState(TIME);

    const parseTime = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const getTimeRemaining = (endtime) => {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        return { total, hours, minutes, seconds };
    };

    const startTimer = (endtime) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(endtime);
        if (total >= 0) {
            setTimer(
                `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
            );
        } else {
            clearInterval(Ref.current); // Stop the timer
            if (onTimeout) onTimeout(); // Trigger the timeout callback
        }
    };

    const clearTimer = (endtime) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(endtime);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + parseTime(TIME)); // Add TIME seconds to the current time
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
        return () => { if (Ref.current) clearInterval(Ref.current); }; // Cleanup on component unmount
    }, []);

    const onClickReset = () => {
        clearTimer(getDeadTime());
    };

    return (
        <div style={{ textAlign: "center", margin: "auto" }}>
            <h1 style={{ color: "green" }}>TIMER</h1>
            <h2>{timer}</h2>
            {/* <button onClick={onClickReset}>Reset</button> */}
        </div>
    );
};

export default Timer;