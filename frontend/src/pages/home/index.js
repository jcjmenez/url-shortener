import { useEffect, useState } from 'react';
import isValidUrl from '../../helpers/is-valid-url';
import urlService from '../../services/urls';

const Home = () => {
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isValidUrl(urlInput) || urlInput === '' || urlInput.includes('http://localhost')) {
      setStatus('');
    } else {
      setStatus('Url must be valid');
    }
  }, [urlInput]);

  const handleUrlChange = (event) => {
    event.preventDefault();
    setUrlInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === '' && urlInput.length > 0) {
      const urlToAdd = { longUrl: urlInput };
      urlService
        .create(urlToAdd)
        .then((newUrl) => {
          const { longUrl, shortUrl } = newUrl;
          setUrls([...urls, { longUrl, shortUrl }]);
        });
    }
  };

  return (
    <div className="App">
      <h1>Short a URL</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" onChange={handleUrlChange} />
        <input type="submit" value="Short" />
      </form>
      <h3>{status}</h3>
      <hr />

      <div className="shorted-links">
        <h2>Shorted urls</h2>
        <ul className="recent-links">
          {
          urls.length > 0
            ? urls.map((url) => (
              <li key={url.shortUrl}>
                <span className="long-link">{url.longUrl}</span>
                <span className="short-link">
                  <a href={`${process.env.REACT_APP_API_URL}/${url.shortUrl}`}>
                    {`${process.env.REACT_APP_API_URL}/${url.shortUrl}`}
                  </a>
                </span>
              </li>
            ))
            : 'Input a url to short'
          }
        </ul>
      </div>
    </div>
  );
};

export default Home;
