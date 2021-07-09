class GiphyService {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
    this.url = 'api.giphy.com/v1/gifs/search';
    this.protocol = 'https';
    this.limit = 4;
    this.offset = 0;
    this.cache = [];
  }

  buildUrl(query) {
    return `${this.protocol}://${this.url}?api_key=${this.apiKey}&limit=${this.limit}&offset=${this.offset}&q=${query}`;
  }

  async fetch(query) {
    const url = this.buildUrl(query);
    const response = await window.fetch(url);
    const data = await response.json();
    
    const gifObjects = data.data
    const gifUrls = gifObjects.map((gifObject) => gifObject.images.original.url);
    this.cache = this.cache.concat(gifUrls);
    this.offset = this.offset + this.limit;
    return gifUrls;
  }

  reset() {
    this.cache = [];
    this.offset = 0;
  }
}

export default GiphyService;
