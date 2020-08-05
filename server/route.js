const jwt = require('jsonwebtoken');
module.exports = function (app) {
  app.use('/api', function (req, res, next) {
  
    const authTOken = req.headers['authorization'];
    
    const token = authTOken && authTOken.split(' ')[1];
    console.log(process.env.privateKey)
    console.log("---------------------------")
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.privateKey, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  });

  require('./controllers/User.Controller')(app, '/api/user');
  require('./controllers/App.Controller')(app, '/api/app');
  require('./controllers/Api.Controller')(app, '/api');
};
