import React, { useState, useEffect } from 'react';
import play from "../img/Play.png";
import pause from "../img/Next.png";
import './counter.css';

const CountdownTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const resetHandler = () => {
    setTotalSeconds(0);
    document.getElementById('minutes').value = '0';
    setIsPaused(false);
    clearInterval(intervalId);
  };

  const pauseHandler = () => {
    setIsPaused(true);
    clearInterval(intervalId);
  };

  const startTimer = () => {
    setIsPaused(false);
    if (totalSeconds > 0 && !isPaused) {
      const newIntervalId = setInterval(() => {
        setTotalSeconds(prevSeconds => {
          if (prevSeconds === 1) {
            clearInterval(newIntervalId); // Clear interval when countdown reaches zero
          }
          return prevSeconds - 1;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handleChange = (event) => {
    setTotalSeconds(parseInt(event.target.value) * 60 || 0);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalId);
  }, [totalSeconds, isPaused]);

  return (
    <div className='first'>
      <label htmlFor="minutes">Enter Minutes</label>
      <input type="text" id="minutes" onChange={handleChange} />
      <div className='second'>
        <label  className='reset' htmlFor='reset'>Reset</label>
        <button id='reset' onClick={resetHandler}>
          <img src={play} alt="Play Icon" />
        </button>
      </div>
      <div className='second'>
        <label className='pause' htmlFor='pause'>Pause</label>
        <button id='pause' onClick={pauseHandler}>
          <img src={pause} alt="Pause Icon" />
        </button>
      </div>

      <span className='countdown'>{formatTime(totalSeconds)}</span>
    </div>
  );
};

export default CountdownTimer;
