module.exports = function (app) {
  require('./controllers/User.Controller')(app, '/user');
  require('./controllers/Api.Controller')(app, '/api');
};
