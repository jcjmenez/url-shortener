import { useEffect, useState } from 'react';
import isValidUrl from '../../helpers/is-valid-url';
import urlService from '../../services/urls';
import './styles.css';

const Home = () => {
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [status, setStatus] = useState('');
  const [copyStatus, setCopyStatus] = useState('copy');

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
      <h1>Shorten your link</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" onChange={handleUrlChange} />
        <input type="submit" value="Shorten" />
      </form>
      <h3>{status}</h3>
      <hr />
      <section className="urls">
        <div className="shorted-links">
          <ul className="recent-links">
            {
          urls.length > 0
            ? urls.map((url) => (
              <li key={url.shortUrl} className="link">
                <span className="long-link">{url.longUrl}</span>
                <span>
                  <span className="short-link">
                    <a href={`${process.env.REACT_APP_API_URL}/${url.shortUrl}`}>
                      {`${process.env.REACT_APP_API_URL}/${url.shortUrl}`}
                    </a>
                  </span>
                  <span className="copy">
                    <button
                      type="button"
                      className={`button ${copyStatus}`}
                      onClick={() => {
                        setCopyStatus('copied');
                        navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/${url.shortUrl}`);
                        setTimeout(() => {
                          setCopyStatus('copy');
                        }, 1000);
                      }}
                    >
                      {copyStatus}
                    </button>
                  </span>
                </span>
              </li>
            ))
            : 'No recent links shorted'
          }
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
