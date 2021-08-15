import { useState, useEffect } from 'react';
import urlService from '../../services/urls';

const Home = () => {
  const [urls, setUrls] = useState([]);

  const compare = (a, b) => {
    if (a.clicks < b.clicks) {
      return 1;
    }
    if (a.clicks > b.clicks) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    urlService
      .getAll()
      .then((dbUrls) => {
        dbUrls.sort(compare);
        setUrls(dbUrls);
      });
  }, []);

  return (
    <div className="App">
      <h1>Top Urls</h1>
      <ul>
        {urls.map((url) => <li key={url.shortUrl}>{url.shortUrl}</li>)}
      </ul>
    </div>
  );
};

export default Home;
