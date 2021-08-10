import { useState } from 'react';
import './App.css';

function App() {
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]);

  const handleUrlChange = (event) => {
    event.preventDefault();
    setUrlInput(event.target.value);
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const ids = urls.map((url) => url.id);
        const maxId = ids.length > 0
          ? Math.max(...ids) + 1
          : 0;
        const urlToAdd = { id: maxId || 0, longUrl: urlInput };
        setUrls([...urls, urlToAdd]);
      }}
      >
        <input type="text" name="url" onChange={handleUrlChange} />
        <input type="submit" value="Short" />
      </form>
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
