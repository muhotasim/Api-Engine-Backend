const dbSdk = require('../databaseSDK');
const { uploadFilesAndGetUrlsWithKeyAndObject } = require('../common');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const nodemailer = require('nodemailer');
const modulePrefix = 'api_engine_';
module.exports = function (app, prefix) {
  app.use(prefix, function (req, res, next) {
    const authTOken = req.headers['authorization'];
    const token = authTOken && authTOken.split(' ')[1];

    if (!token) return res.sendStatus(401);
    jwt.verify(token, config.privateKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  });
  app.post(prefix + '/send-mail', function (req, res) {
    const { from, to, subject, text, html } = req.body;
    let transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: config.mailSecure,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });

    const sendMailObj = {
      from,
      to,
      subject,
    };
    if (text) {
      sendMailObj.text = text;
    } else if (html) {
      sendMailObj.html = html;
    }

    transporter.sendMail(sendMailObj, (error, success) => {
      console.log(error);
      if (error) return res.sendStatus(401);
      return res.json({
        status: 'success',
        data: [],
      });
    });
  });
  app.post(prefix + '/module/create', function (req, res) {
    const moduleName = modulePrefix + req.body.moduleName;
    dbSdk.useRawQuery(
      `SELECT * FROM system WHERE name='${moduleName}'`,
      (result) => {
        if (result.length == 0) {
          dbSdk.createTable(moduleName, function (d) {
            res.json({
              status: 'success',
              data: [],
            });
          });
        } else {
          res.json({
            status: 'failed',
            data: [],
          });
        }
      }
    );
  });
  app.post(prefix + '/module/delete', function (req, res) {
    const params = req.body;

    dbSdk.useRawQuery(
      `SELECT * FROM system WHERE name='${modulePrefix + params.moduleName}'`,
      (result) => {
        let d = result[0];
        dbSdk.deleteWithQuery('system', 'WHERE id=' + d.id, (re) => {
          dbSdk.deleteTable(modulePrefix + params.moduleName, function () {
            res.json({
              status: 'success',
              data: [],
            });
          });
        });
      }
    );
  });
  app.post(prefix + '/module/add-field', function (req, res) {
    const params = req.body;
    dbSdk.useRawQuery(
      `SELECT * FROM system WHERE name='${modulePrefix + params.moduleName}'`,
      (result) => {
        let field = JSON.parse(params.field);
        let d = result[0];
        let structure = JSON.parse(d.structure);
        let fieldIndex = structure.findIndex((d) => {
          return d.name == field.name;
        });
        if (fieldIndex == -1) {
          structure.push(field);
          d.structure = JSON.stringify(structure);
          dbSdk.updateData(
            'system',
            d,
            ` WHERE name='${modulePrefix + params.moduleName}'`,
            () => {
              dbSdk.addField(modulePrefix + params.moduleName, field, function (
                d
              ) {
                res.json({
                  status: 'success',
                  data: [],
                });
              });
            }
          );
        } else {
          return res.status(500).json({
            status: 'failed',
            data: [],
          });
        }
      }
    );
  });
  app.post(prefix + '/module/remove-field', function (req, res) {
    const params = req.body;
    dbSdk.useRawQuery(
      `SELECT * FROM system WHERE name='${modulePrefix + params.moduleName}'`,
      (result) => {
        let field = JSON.parse(params.field);
        let d = result[0];
        let structure = JSON.parse(d.structure);
        let fieldIndex = structure.findIndex((d) => {
          return d.name == field.name;
        });
        structure.splice(fieldIndex, 1);
        d.structure = JSON.stringify(structure);
        dbSdk.updateData(
          'system',
          d,
          ` WHERE name='${modulePrefix + params.moduleName}'`,
          () => {
            dbSdk.removeField(
              modulePrefix + params.moduleName,
              JSON.parse(params.field),
              function (d) {
                res.json({
                  status: 'success',
                  data: [],
                });
              }
            );
          }
        );
      }
    );
  });
  app.post(prefix + '/modules', function (req, res) {
    const params = req.body;

    let query = ' SELECT * FROM system  LIMIT 10 OFFSET 0';
    dbSdk.useRawQuery(query, (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      return res.json({
        status: 'success',
        data: returnData,
      });
    });
  });
  // middlewate for module structure
  app.use(prefix + '/:moduleName', function (req, res, next) {
    dbSdk.useRawQuery(
      `SELECT * FROM system WHERE name='${
        modulePrefix + req.params.moduleName
      }'`,
      (result) => {
        if (result.length) {
          let structure = JSON.parse(result[0].structure);
          req.structure = structure;
          next();
        } else {
          res.json({
            status: 'failed',
            data: [],
          });
        }
      }
    );
  });
  // api query
  app.get(prefix + '/:moduleName/:id', function (req, res) {
    const params = req.params;
    const moduleName = modulePrefix + params.moduleName;
    const id = params.id;
    let query = ` SELECT * FROM ${moduleName} WHERE id=${id} LIMIT 1`;
    dbSdk.useRawQuery(query, (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      return res.status(200).json({
        status: 'success',
        data: returnData,
      });
    });
  });
  app.post(prefix + '/:moduleName/get', function (req, res) {
    const params = req.body;
    const moduleName = modulePrefix + req.params.moduleName;
    const query = `SELECT ${
      params.select ? params.select : '*'
    } FROM ${moduleName} ${params.query ? params.query : ''}`;
    dbSdk.useRawQuery(query, (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      return res.status(200).json({
        status: 'success',
        data: returnData,
      });
    });
  });
  app.post(prefix + '/:moduleName/delete', function (req, res) {
    const params = req.body;
    const moduleName = modulePrefix + req.params.moduleName;
    const query = `DELETE  FROM ${moduleName} ${
      params.query ? params.query : ''
    }`;
    dbSdk.useRawQuery(query, (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      res.status(200).json({
        status: 'success',
        data: returnData,
      });
    });
  });
  app.post(prefix + '/:moduleName/delete/:id', function (req, res) {
    const moduleName = modulePrefix + req.params.moduleName;
    const query = `DELETE  FROM ${moduleName} WHERE id=${req.params.id}`;
    dbSdk.useRawQuery(query, (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      return res.status(200).send({
        status: 'success',
        data: returnData,
      });
    });
  });
  app.post(prefix + '/:moduleName/update/:id', function (req, res) {
    const moduleName = modulePrefix + req.params.moduleName;
    dbSdk.updateData(
      moduleName,
      req.body,
      'WHERE id=' + req.params.id,
      (returnData) => {
        if (returnData == false) {
          return res.status(500).json({
            status: 'failed',
            data: [],
          });
        }
        return res.status(200).json({
          status: 'success',
          data: returnData,
        });
      }
    );
  });
  app.post(prefix + '/:moduleName/update', function (req, res) {
    const moduleName = modulePrefix + req.params.moduleName;
    dbSdk.updateData(moduleName, req.body, req.params.query, (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      return res.status(200).json({
        status: 'success',
        data: returnData,
      });
    });
  });
  app.post(prefix + '/:moduleName/delete/:id', function (req, res) {
    const params = req.body;
    const moduleName = modulePrefix + req.params.moduleName;
    const query = `DELETE  FROM ${moduleName} WHERE id=${req.params.id}`;
    dbSdk.useRawQuery(query, (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      return res.status(200).json({
        status: 'success',
        data: returnData,
      });
    });
  });
  app.post(prefix + '/:moduleName/insert', function (req, res) {
    let fileFields = [];
    const moduleName = modulePrefix + req.params.moduleName;
    req.structure.forEach((st) => {
      if (st.fieldType == 'file') {
        fileFields.push(st.name);
      }
    });

    uploadFilesAndGetUrlsWithKeyAndObject(
      req.files,
      moduleName,
      fileFields,
      (urls) => {
        let params = req.body;
        Object.keys(urls).forEach((key) => {
          params[key] = urls[key];
        });
        dbSdk.insertData(moduleName, params, (returnData) => {
          if (returnData == false) {
            return res.status(500).json({
              status: 'failed',
              data: [],
            });
          }
          return res.status(200).json({
            status: 'success',
            data: returnData,
          });
        });
      }
    );
  });
  app.post(prefix + '/:moduleName/bulkInsert', function (req, res) {
    const data = req.body.data;
    const moduleName = modulePrefix + req.params.moduleName;
    dbSdk.bulkInsert(moduleName, JSON.parse(data), (returnData) => {
      if (returnData == false) {
        return res.status(500).json({
          status: 'failed',
          data: [],
        });
      }
      return res.status(200).json({
        status: 'success',
        data: returnData,
      });
    });
  });

  // api query
};
