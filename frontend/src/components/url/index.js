import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Url = (props) => {
  const [copyStatus, setCopyStatus] = useState('copy');
  const { shortUrl, longUrl } = props;

  return (
    <>
      <span className="long-link">{longUrl}</span>
      <span>
        <span className="short-link">
          <a href={`${process.env.REACT_APP_API_URL}/${shortUrl}`}>
            {`${process.env.REACT_APP_API_URL}/${shortUrl}`}
          </a>
        </span>
        <span className="copy">
          <button
            type="button"
            className={`button ${copyStatus}`}
            onClick={() => {
              setCopyStatus('copied');
              navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/${shortUrl}`);
              setTimeout(() => {
                setCopyStatus('copy');
              }, 1000);
            }}
          >
            {copyStatus}
          </button>
        </span>
      </span>
    </>
  );
};

Url.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  longUrl: PropTypes.string.isRequired,
};

export default Url;
