// Run @callback at most @limit amount of times every @ms milliseconds
function rateLimit(callback, limit, ms) {
  let timer;
  let count = 0;

  return function(...args) {
    count += 1;

    if (timer === undefined) {
      timer = setTimeout(() => {
        count = 0;
        clearTimeout(timer);
        timer = undefined;
      }, ms);
    }

    if (count <= limit) {
      callback(...args);  
    }
  }  
}

export default rateLimit;
