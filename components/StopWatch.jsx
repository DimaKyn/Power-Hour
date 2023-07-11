import { useState, useRef } from 'react';
import Style from '/styles/Stopwatch.module.css';

export default function StopWatch(){
  // State variables
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  // Function to start the stopwatch
  const start = () => {
    setIsRunning(true);
    if (time === 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  // Function to stop the stopwatch
  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Function to reset the stopwatch
  const reset = () => {
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Function to format the time in MM:SS.SS format
  const formatTime = (time) => {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className={Style.stopwatchContainer}>
      {/* Display the stopwatch time */}
      <div className={Style.stopwatchDisplay}>{formatTime(time)}</div>
      
      {/* Start button */}
      {!isRunning && (
        <button className={Style.buttonStart} onClick={start}>
          {time === 0 ? 'Start' : 'Resume'}
        </button>
      )}
      
      {/* Stop button */}
      {isRunning && (
        <button className={Style.buttonStop} onClick={stop}>Stop</button>
      )}
      
      {/* Reset button */}
      {!isRunning && time !== 0 && (
        <button className={Style.buttonReset} onClick={reset}>Reset</button>
      )}
    </div>
  );
}
