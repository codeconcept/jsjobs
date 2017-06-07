const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const api = express.Router();

api.get('/jobs', (req, res) => {
  res.json(data.jobs);
});

app.use('/api', api);

const port = 4201;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
}); 