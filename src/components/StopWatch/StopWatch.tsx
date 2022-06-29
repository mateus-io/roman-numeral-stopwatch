import { useState, useEffect, useRef } from 'react';
import Roman from 'react-roman'
import { MdPlayArrow, MdPause } from "react-icons/md";

import './StopWatchStyles.css';

const MAX = 60;

function StopWatch() {
  const [counter, setCounter] = useState(0);
  const [play, setPlay] = useState(false);
  const interval = useRef<any>(null);

  function toggle() {
    setPlay((prev) => !prev);
  }

  useEffect(() => {
    if (play) {
      interval.current = setInterval(() => {
        setCounter((prev) => {
          if (prev === MAX) return 1;
          return prev + 1
        });
      }, 500);
    } else {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
    return () => {
      if (interval.current) clearInterval(interval.current);
    }
  }, [play]);

  return (
    <main>
      <Roman>{counter}</Roman>
      <button onClick={toggle} >
        {
          play ? (
            <MdPause size={40} />
          ) : (
            <MdPlayArrow size={40} />
          )
        }
      </button>
    </main>
  );
}

export { StopWatch }