import { useState, useRef } from 'react';
import Style from '/styles/StopWatch.module.css';

export default function StopWatch(){
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();

  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
    clearInterval(intervalRef.current);
  };

  const mark = () => {
    setLaps(prevLaps => [...prevLaps, time]);
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
        <button onClick={start}>Start</button>
      )}
      {isRunning && (
        <>
          <button onClick={stop}>Stop</button>
          <button onClick={mark}>Lap</button>
        </>
      )}
      <button onClick={reset}>Reset</button>
      {laps.length > 0 && (
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
