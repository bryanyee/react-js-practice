import { useState } from 'react';

import ProgressBar from './ProgressBar.js';

class Bar {
  constructor({ id }) {
    this.id = id;
  }
}

function ProgressBars() {
  const [bars, setBars] = useState([]);

  const addBar = () => {
    const bar = new Bar({ id: bars.length });
    setBars((oldBars) => [...oldBars, bar]);
  };

  return (
    <div>
      <button className="mb-2" onClick={addBar}>Add Bar</button>
      {bars.map((bar) => (
        <ProgressBar className="mb-2" key={bar.id} totalMs={3000} />  
      ))}
    </div>
  );
}

export default ProgressBars;
