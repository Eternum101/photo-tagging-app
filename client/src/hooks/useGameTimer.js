import { useState, useEffect } from 'react';

const useGameTimer = (isGameStarted, isGameCompleted) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isGameStarted) {
      setSeconds(0);
      return;
    }

    const timer = setInterval(() => {
      if (isGameCompleted) {
        clearInterval(timer);
      } else {
        setSeconds(prevSeconds => prevSeconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
}, [isGameStarted, isGameCompleted]);

  // Format seconds to HH:MM:SS
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${remainingSeconds}`;
};

export default useGameTimer;
