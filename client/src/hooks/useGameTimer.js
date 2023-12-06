import { useState, useEffect } from 'react';

export default function useGameTimer(isGameStarted) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer = null;

    if (isGameStarted) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isGameStarted]);

  // Format seconds to HH:MM:SS
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${remainingSeconds}`;
}