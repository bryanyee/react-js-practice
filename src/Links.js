import { Link } from 'react-router-dom';
import React from 'react';

import styles from './Links.module.css';

const Links = () => (
  <div className={styles['links-container']}>
    <Link className="d-block" to={{ pathname: '/' }}>
      /
    </Link>
    <Link className="d-block" to={{ pathname: '/simple_hooks' }}>
      Simple Hooks
    </Link>
    <Link className="d-block" to={{ pathname: '/infinite_scroll' }}>
      Infinite Scroll
    </Link>
    <Link className="d-block" to={{ pathname: '/table' }}>
      Table
    </Link>
    <Link className="d-block" to={{ pathname: '/rate_limiter' }}>
      Rate Limiter
    </Link>
    <Link className="d-block" to={{ pathname: '/progress_bars' }}>
      Progress Bars
    </Link>
  </div>
);

export default Links;
