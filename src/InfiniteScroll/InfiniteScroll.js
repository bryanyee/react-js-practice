import { useEffect, useRef, useState, useCallback } from 'react';
import { debounce } from 'lodash';

import styles from './InfiniteScroll.module.css';
import GiphyService from './GiphyService.js';

function InfiniteScroll() {
  const giphyService = useRef(null);
  const searchInput = useRef(null);
  const [gifUrls, setGifUrls] = useState([]);

  function scrollHandler() {
    // https://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    const isAtPageBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (isAtPageBottom && gifUrls.length >= 0) {
      const searchText = searchInput.current.value;
      giphyService.current.fetch(searchText)
        .then((newUrls) => {
          setGifUrls((oldUrls) => [...oldUrls, ...newUrls]);
        }); 
    }
  }

  // Throttling in React: https://dev.to/pulkitnagpal/using-throttling-and-debouncing-with-react-hooks-57f1
  // 1) *Throttle inside useEffect
  // 2) useCallback or useRef
  useEffect(() => {
    const debouncedScrollHandler = debounce(scrollHandler, 200);
    window.addEventListener('scroll', debouncedScrollHandler);

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler)
    }
  }, []);

  useEffect(() => {
    giphyService.current = new GiphyService({ apiKey: 'jUzdRpetkqW3OS260Xfi9eBzkVN0welj'});

    return () => {
      giphyService.current = null;
    }
  }, []);

  const search = () => {
    const searchText = searchInput.current.value || '';

    if (searchText === '') {
      return;
    }

    setGifUrls([]);
    giphyService.current.reset();
    giphyService.current.fetch(searchText)
      .then((urls) => {
        setGifUrls(urls);
      });
  }

  return (
    <div className={styles['gif-container']}>
      <div className={styles['search-area']}>
        <input type="text" ref={searchInput} />
        <button onClick={search}>Search</button>
      </div>
      {gifUrls.map((gifUrl) => (
        <img className={styles['gif-item']} src={gifUrl} key={gifUrl} />
      ))}
    </div>
  );
}

export default InfiniteScroll;
