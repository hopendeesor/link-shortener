const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Link Shortener API listening on port ${PORT}`);
});
