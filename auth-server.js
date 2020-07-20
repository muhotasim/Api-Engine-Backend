const express = require('express');
const port = process.env.port || 9007;
const dotenv = require('dotenv');
const fs = require('fs');
const app = express();
const envConfig = dotenv.parse(fs.readFileSync('.env'));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9009');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

app.use(express.urlencoded());
app.use(express.json());

const onListen = () => {
  console.log(`server is running at http://localhost:${port}`);
};
app.listen(port, onListen);
app.get('/', (req, res) => {
  res.send('Server is running');
});

require('./server/controllers/Auth.Controller')(app, '/auth');
