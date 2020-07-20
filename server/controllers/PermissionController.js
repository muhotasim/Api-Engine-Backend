const dbSdk = require('../databaseSDK');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = function (app, prefix) {
  app.post(prefix + '/create', function (req, res) {
    res.send('create user');
  });

  // get user
  app.post(prefix + '/get', function (req, res) {
    res.send('get user');
  });

  // get user
  app.post(prefix + '/set', function (req, res) {
    res.send('update user');
  });

  // update user
  app.post(prefix + '/delete', function (req, res) {
    res.send('delete user');
  });
};
