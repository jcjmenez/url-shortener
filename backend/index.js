require('dotenv').config();
require('./mongo');

const express = require('express');

const app = express();
const cors = require('cors');

const { customAlphabet } = require('nanoid/non-secure');
const Url = require('./models/url');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>URLS API</h1>');
});

app.get('/api/urls', (req, res) => {
  Url.find({})
    .then((urls) => {
      res.json(urls);
    });
});

app.post('/api/urls', (req, res) => {
  const url = req.body;
  if (!url || !url.longUrl) {
    res.status(400).json({
      error: 'Long url is missing',
    });
  }

  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7);
  const newUrl = new Url({
    longUrl: url.longUrl,
    shortUrl: nanoid(),
    clicks: 0,
  });
  newUrl.save()
    .then((savedNote) => res.json(savedNote));
});

app.get('/:url', (req, res, next) => {
  const sUrl = req.params.url;

  Url.findOne({ shortUrl: sUrl })
    .then((url) => {
      if (url) {
        url.clicks += 1;
        url.save().then((savedUrl) => res.redirect(301, savedUrl.longUrl));
      } else {
        res.status(404).end();
      }
    }).catch((err) => next(err));
});

app.use((req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
