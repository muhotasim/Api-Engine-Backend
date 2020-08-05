const express = require('express');
const port = process.env.port || 9007;
const dotenv = require('dotenv');
const fs = require('fs');
const app = express();
const envConfig = dotenv.parse(fs.readFileSync('.env'));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

app.use(express.urlencoded());
app.use(express.json());

const onListen = () => {
  console.log(`auth server is running at http://localhost:${port}`);
};
app.listen(port, onListen);

require('./server/controllers/Auth.Controller')(app, '/auth');
