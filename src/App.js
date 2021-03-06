import { Fragment, useRef } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import styles from './App.module.css';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll.js';
import Links from './Links';
import ProgressBars from './ProgressBars/ProgressBars.js';
import RateLimiter from './RateLimiter/RateLimiter.js';
import SimpleHooks from './SimpleHooks/SimpleHooks.js';
import Table from './Table/Table.js';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles['app-container']}>
        <BrowserRouter basename="/">
          <Fragment>
            <Route exact path="/" component={() => <div />} />
            <Route path="/infinite_scroll" component={InfiniteScroll} />
            <Route path="/progress_bars" component={ProgressBars} />
            <Route path="/rate_limiter" component={RateLimiter} />
            <Route path="/simple_hooks" component={SimpleHooks} />
            <Route path="/table" component={Table} />
            <Route component={Links} />
          </Fragment>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
