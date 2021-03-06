const dbSdk = require('../databaseSDK');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = function (app, prefix) {
  app.post(prefix + '/login', function (req, res) {
    const { email, password } = req.body;

    // if (!email || !password) return res.sendStatus(401);
    dbSdk.useRawQuery(
      'SELECT * FROM user WHERE email="' + email + '"',
      (returnData) => {
        if (returnData && returnData.length) {
          const user = returnData[0];
          bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  userId: user.id,
                },
                process.env.privateKey,
                {
                  expiresIn:process.env.tokenExpireTime*1000,
                }
              );
              const refresh_token = jwt.sign(
                { userId: user.id },
                process.env.REFRESH_TOKEN_PRIVATE_KEY
              );
              var dt = new Date();
              dt = dt.getTime() + process.env.tokenExpireTime * 1000;

              const tokenData = {
                token: refresh_token,
                expires_in: dt,
              };
              dbSdk.insertData('auth_token', tokenData, (returnData) => {
                return res.send({
                  status: 'success',
                  access_token: token,
                  refresh_token: refresh_token,
                });
              });
            } else {
              return res.status(401).json({
                status: 'failed',
                data: [],
              });
            }
          });
        } else {
          return res.status(401).json({
            status: 'failed',
            data: [],
          });
        }
      }
    );
  });

  app.post(prefix + '/token', function (req, res) {
    const rf_token = req.body.refresh_token;
    if (!rf_token) return res.sendStatus(401);
    dbSdk.useRawQuery(
      'SELECT * FROM auth_token WHERE token=' + '"' + rf_token + '"',
      (returnData) => {
        if (returnData.length) {
          const data = returnData[0];
          jwt.verify(
            data.token,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            (err, result) => {
              if (err) {
                return res.status(403).json({
                  status: 'failed',
                  data: [],
                });
              }

              const token = jwt.sign(
                {
                  userId: result.id,
                },
                process.env.privateKey,
                {
                  expiresIn: process.env.tokenExpireTime*1000,
                }
              );
              const refresh_token = jwt.sign(
                { userId: result.id },
                process.env.REFRESH_TOKEN_PRIVATE_KEY
              );
              var dt = new Date();
              dt = dt.setMinutes(dt.getMinutes() + 15);
              const tokenData = {
                token: refresh_token,
                expires_in: dt,
              };
              dbSdk.deleteWithQuery(
                'auth_token',
                " WHERE token='" + rf_token + "'",
                (returnD) => {
                  dbSdk.insertData('auth_token', tokenData, (returnData) => {
                    return res.status(200).send({
                      status: 'success',
                      access_token: token,
                      refresh_token: refresh_token,
                    });
                  });
                }
              );
            }
          );
        } else {
          return res.status(403).json({
            status: 'failed',
            data: [],
          });
        }
      }
    );
  });
};
