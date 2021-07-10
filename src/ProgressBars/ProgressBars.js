import { useEffect, useRef, useState } from 'react';

import styles from './ProgressBars.module.css';
import ProgressBar from './ProgressBar.js';

class Bar {
  constructor({ id, duration = 3, isComplete = false }) {
    this.id = id;
    this.duration = duration; // In seconds
    this.isComplete = isComplete;
  }
}

function ProgressBars() {
  const [bars, setBars] = useState([]);
  const barsByIdRef = useRef({}); // { barId: <bar> }
  const secondsInputRef = useRef(null);

  useEffect(() => {
    const nextBar = bars.find((bar) => !bar.isComplete);
    if (nextBar) {
      const barComponent = barsByIdRef.current[nextBar.id];
      barComponent.start();
    }
  }, [bars]);

  const addBar = () => {
    const seconds = secondsInputRef.current.value !== '' ? Number(secondsInputRef.current.value) : 3; // Default to 3
    const bar = new Bar({ id: bars.length, duration: seconds });
    setBars((oldBars) => [...oldBars, bar]);
  };

  const onProgressEnd = (id) => {
    const updatedBars = bars.map((bar) => {
      if (bar.id === id) {
        bar.isComplete = true;
      }
      return bar;
    });
    setBars(updatedBars);
  };

  return (
    <div>
      <label for="seconds">Duration (seconds)</label>
      <br />
      <input id={styles['seconds-input']} ref={secondsInputRef} type="number" />
      <br />
      <button className="my-2" onClick={addBar}>Add Bar</button>
      {bars.map((bar) => (
        <ProgressBar
          className="mb-2"
          id={bar.id}
          key={bar.id}
          onEnd={onProgressEnd}
          ref={(el) => { // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
            barsByIdRef.current[bar.id] = el;
          }}
          totalMs={bar.duration * 1000}
        />  
      ))}
    </div>
  );
}

export default ProgressBars;
