const jwt = require('jsonwebtoken');
module.exports = function (app) {
  app.use('/api', function (req, res, next) {
    const authTOken = req.headers['authorization'];
    const token = authTOken && authTOken.split(' ')[1];

    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.privateKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  });

  require('./controllers/User.Controller')(app, '/api/user');
  require('./controllers/Api.Controller')(app, '/api');
};
