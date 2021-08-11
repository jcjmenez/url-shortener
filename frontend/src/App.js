import { useEffect, useState } from 'react';
import isValidUrl from './helpers/is-valid-url';
import urlService from './services/urls';
import './App.css';

function App() {
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    urlService
      .getAll()
      .then((res) => setUrls(res));
  }, []);

  useEffect(() => {
    if (isValidUrl(urlInput) || urlInput === '' || urlInput.includes('http://localhost:3000')) {
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
          setUrls([...urls, newUrl]);
        });
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" onChange={handleUrlChange} />
        <input type="submit" value="Short" />
      </form>
      <h3>{status}</h3>
      <hr />

      <div>
        <h2>Shorted urls</h2>
        <ul>
          {
          urls.length > 0
            ? urls.map((url) => (
              <li key={url.id}>{url.longUrl}</li>
            ))
            : 'Input a url to short'
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
