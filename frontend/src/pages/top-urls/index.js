import { useState, useEffect } from 'react';
import Url from '../../components/url';
import urlService from '../../services/urls';

const Top = () => {
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
      <section className="urls">
        <div className="shorted-links">
          <ul className="recent-links">
            {
          urls.length > 0
            ? urls.map((url) => (
              <li key={url.shortUrl} className="link">
                <Url shortUrl={url.shortUrl} longUrl={url.longUrl} />
              </li>
            ))
            : 'No links shorted'
          }
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Top;
