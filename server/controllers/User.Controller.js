const dbSdk = require('../databaseSDK');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = function (app, prefix) {
  app.get(prefix, function (req, res) {
    res.send('hello world');
  });

  app.post(prefix + '/create', function (req, res) {
    const { name, password, email } = req.body;
    dbSdk.useRawQuery(
      'SELECT * FROM user WHERE email="' + email + '"',
      (returndata) => {
        if (returndata && returndata.length == 0) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              dbSdk.insertData(
                'user',
                {
                  name: name,
                  password: hash,
                  active: true,
                  internal: false,
                  email: email,
                },
                () => {
                  return res.send({
                    status: 'success',
                    data: true,
                  });
                }
              );
            });
          });
        } else {
          return res.send({
            status: 'failed',
            data: false,
            message: 'user exists',
          });
        }
      }
    );
  });

  // get user
  app.post(prefix + '/get', function (req, res) {
    res.send('get user');
  });

  // get user
  app.post(prefix + '/get', function (req, res) {
    res.send('update user');
  });

  // update user
  app.post(prefix + '/delete', function (req, res) {
    res.send('delete user');
  });
};
