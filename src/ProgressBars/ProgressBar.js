import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import styles from './ProgressBar.module.css';

function ProgressBar2({ className, totalMs }) {
  const progressBar = useRef(null);

  useEffect(() => {
    const seconds = totalMs / 1000;
    progressBar.current.style.transition = `width ${seconds}s linear`;
    progressBar.current.style.width = '100%';
  }, []);

  return (
    <div className={`${styles['progress-container']} ${className}`}>
      <div className={styles['progress-bar']} ref={progressBar} />
    </div>
  );
}

ProgressBar2.propTypes = {
  className: PropTypes.string,
  totalMs: PropTypes.number,
};

ProgressBar2.defaultProps = {
  className: '',
  totalMs: 5000,
};

function ProgressBar1({ className, totalMs }) {
  const progressBar = useRef(null);

  useEffect(() => {
    const intervalMs = totalMs / 100;
    let width = 0;

    let interval = setInterval(() => {
      width += 1;
      if (width > 100) {
        clearInterval(interval);
        return;
      }
      progressBar.current.style.width = `${width}%`;
    }, intervalMs);
  }, []);

  return (
    <div className={`${styles['progress-container']} ${className}`}>
      <div className={styles['progress-bar']} ref={progressBar} />
    </div>
  );
}

ProgressBar1.propTypes = {
  className: PropTypes.string,
  totalMs: PropTypes.number,
};

ProgressBar1.defaultProps = {
  className: '',
  totalMs: 5000,
};

export default ProgressBar2;
