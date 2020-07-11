const dbSdk = require('../databaseSDK');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../../config');
module.exports = function (app, prefix) {
  app.post(prefix + '/token', function (req, res) {
    const { email, password } = req.body;
    dbSdk.useRawQuery(
      'SELECT * FROM user WHERE email="' + email + '"',
      (returnData) => {
        if (returnData && returnData.length) {
          const user = returnData[0];
          bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: email,
                  userId: user.id,
                },
                config.privateKey,
                {
                  expiresIn: 60000,
                }
              );
              return res.send({
                status: 'success',
                token: token,
              });
            } else {
              return res.send({
                status: 'failed',
                message: 'Auth Failed',
              });
            }
          });
        } else {
          return res.send({
            status: 'failed',
            message: 'Auth Failed',
          });
        }
      }
    );
  });

  app.post(prefix + '/refresh_token', function (req, res) {
    const token = req.body.refresh_token;
    jwt.verify(token, config.privateKey, function (err, decoded) {
      if (err) {
        return res.send({
          status: 'failed',
          token: '',
        });
      }
      console.log(decoded);
      dbSdk.useRawQuery(
        'SELECT * FROM user WHERE id=' + decoded.userId,
        (returnData) => {
          if (returnData && returnData.length) {
            const user = returnData[0];
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.id,
              },
              config.privateKey,
              {
                expiresIn: 60000,
              }
            );
            return res.send({
              status: 'success',
              token: token,
            });
          }
        }
      );
    });
  });
};
