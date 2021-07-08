import { Link } from 'react-router-dom';
import React from 'react';

import styles from './Links.module.css';

const Links = () => (
  <div className={styles['links-container']}>
    <Link className="d-block" to={{ pathname: '/' }}>
      /
    </Link>
    <Link className="d-block" to={{ pathname: '/infinite_scroll' }}>
      Infinite Scroll
    </Link>
  </div>
);

export default Links;
