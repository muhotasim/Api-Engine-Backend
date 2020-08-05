const dbSdk = require('../databaseSDK');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = function (app, prefix) {

  app.post(prefix , function (req, res) {

    dbSdk.selectAllData("app",returnData=>{
      res.send({
        status:"success",
        data:returnData
      })
    })
    
  })
  app.post(prefix + '/create', function (req, res) {
    const { app_name, app_info, is_active } = req.body;
    console.log(app_name,app_info,is_active)
    dbSdk.insertData("app",{app_name:app_name,app_info:app_info,is_active:is_active?1:0},returnData=>{
      if(returnData){
        res.send({
          status:"success"
        })
      }else{
        res.send({
          status:"failed"
        })
      }
    })
    
  })

  // app.post(prefix + '/create', function (req, res) {
  //   res.send({})
  // })
}