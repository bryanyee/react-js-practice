import { useState, useEffect } from 'react';

function SimpleHooks() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [counter]);

  useEffect(() => () => console.log('Dismounted simple hooks'), []);

  return (
    <div>
      <div>{counter}</div>
    </div>
  );
}

export default SimpleHooks;
