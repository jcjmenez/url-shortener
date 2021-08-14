const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  clicks: Number,
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
