const express = require('express');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
var cors = require('cors');
const port = process.env.port || 9008;
const path = require('path');
const fs = require('fs');
const app = express();
const envConfig = dotenv.parse(fs.readFileSync('.env'));

app.use(cors());
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

app.use(express.urlencoded());
app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: false,
    tempFileDir: '/tmp/',
    createParentPath: true,
    abortOnLimit: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));
const onListen = () => {
  console.log(`api server is running at http://localhost:${port}`);
};
app.listen(port, onListen);

require('./server')(app);
