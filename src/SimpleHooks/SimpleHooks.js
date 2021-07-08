import { useState, useEffect } from 'react';

function SimpleHooks() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter(5);
    }, 4000);

    return (() => {
      console.log('Dismounted simple hooks');
      clearTimeout(timeout);
    });
  }, []);

  return (
    <div>
      <div>{counter}</div>
    </div>
  );
}

export default SimpleHooks;
