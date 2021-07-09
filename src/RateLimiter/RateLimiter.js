import { useState, useCallback, useRef } from 'react';

import styles from './RateLimiter.module.css';
import rateLimit from './rateLimit.js';

function RateLimiter() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const increment2 = () => {
    setCounter2((c) => c + 1);
  }

  // Throttling in React: https://dev.to/pulkitnagpal/using-throttling-and-debouncing-with-react-hooks-57f1
  // 1) useEffect
  // 2) *useCallback or useRef - using this approach because the click handler is *not set up inside useEffect

  // Limit the incrementer to 4 hits every 5 sec.
  const rateLimitedIncrement = useCallback(rateLimit(increment2, 4, 5000), []);
  // const rateLimitedIncrement = useRef(rateLimit(increment2, 4, 5000));

  const onClickHandler = () => {
    setCounter1((c) => c + 1);
    rateLimitedIncrement();
    // rateLimitedIncrement.current();
  };

  return (
    <div className={styles.container}>
      <div>
        <button onClick={onClickHandler}>Hit</button>
      </div>
      <div className={styles.panel}>
        <div>Counter</div>
        <div>{counter1}</div>
      </div>
      <div className={styles.panel}>
        <div>Rate-limited Counter</div>
        <div>{counter2}</div>
      </div>
    </div>
  );
}

export default RateLimiter;
