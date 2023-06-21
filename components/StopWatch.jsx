import { useState, useRef } from 'react';
import Style from '/styles/Stopwatch.module.css';

export default function StopWatch(){
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

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

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className={Style.stopwatchContainer}>
      <div className={Style.stopwatchDisplay}>{formatTime(time)}</div>
      {!isRunning && (
        <button className={Style.buttonStart} onClick={start}>
          {time === 0 ? 'Start' : 'Resume'}
        </button>
      )}
      {isRunning && (
        <button className={Style.buttonStop} onClick={stop}>Stop</button>
      )}
      {!isRunning && time !== 0 && (
        <button className={Style.buttonReset} onClick={reset}>Reset</button>
      )}
    </div>
  );
}
