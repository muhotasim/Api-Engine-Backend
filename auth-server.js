const express = require('express');
const port = 9007;
const dotenv = require('dotenv');
const fs = require('fs');
const app = express();
const envConfig = dotenv.parse(fs.readFileSync('.env'));
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
