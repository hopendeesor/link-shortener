const express = require('express');
const app = express();

app.use(express.json());

let links = {};
let counter = 1;

app.post('/links', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  const code = `link${counter++}`;
  links[code] = url;
  res.status(201).json({ code, url });
});

app.get('/links/:code', (req, res) => {
  const url = links[req.params.code];
  if (!url) {
    return res.status(404).json({ error: 'Link not found' });
  }
  res.status(200).json({ url });
});

module.exports = app;
