import PropTypes from 'prop-types';
import { Component, createRef, useEffect, useRef } from 'react';

import styles from './ProgressBar.module.css';

// ProgressBar implemented with css transition, and functionality to trigger progress start
class ProgressBar1 extends Component {
  constructor(props) {
    super(props);
    this.progressBarRef = createRef();
  }

  componentDidMount() {
    if (this.props.startImmediately) {
      this.runAnimation();
    }
  }

  runAnimation = () => {
    const seconds = this.props.totalMs / 1000;
    this.progressBarRef.current.style.transition = `width ${seconds}s linear`;
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    requestAnimationFrame(() => {
      this.progressBarRef.current.style.width = '100%';  
    });

    setTimeout(() => {
      this.props.onEnd(this.props.id);
    }, this.props.totalMs);
  }

  start = () => {
    this.runAnimation();
  }

  render() {
    return (
      <div className={`${styles['progress-container']} ${this.props.className}`}>
        <div className={styles['progress-bar']} ref={this.progressBarRef} />
        <div className={styles['progress-text']}>{`${this.props.totalMs / 1000} s`}</div>
      </div>
    );
  }
}

ProgressBar1.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  onEnd: PropTypes.func,
  startImmediately: PropTypes.bool,
  totalMs: PropTypes.number,
};

ProgressBar1.defaultProps = {
  className: '',
  id: null,
  onEnd: () => {},
  startImmediately: false,
  totalMs: 5000,
};

// ProgressBar implemented with setInterval (not used)
function ProgressBar2({ className, totalMs }) {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const intervalMs = totalMs / 100;
    let width = 0;

    let interval = setInterval(() => {
      width += 1;
      if (width > 100) {
        clearInterval(interval);
        return;
      }
      progressBarRef.current.style.width = `${width}%`;
    }, intervalMs);
  }, []);

  return (
    <div className={`${styles['progress-container']} ${className}`}>
      <div className={styles['progress-bar']} ref={progressBarRef} />
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

export default ProgressBar1;
