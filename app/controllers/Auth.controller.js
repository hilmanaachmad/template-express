var jwt = require ('jsonwebtoken');
var modelsStatic =  require ('../config/sequelizeStatic');
var api = require ('../tools/common');
var config = require ('../config/settings');
var models = require('../config/sequelize')
var Sequelize = require ('sequelize');

var md5 = require('md5'); 


function login(req, res, next) {

  modelsStatic.sequelizeUser.query("select TOP 1 lg_nik, lg_name, lg_location, sectionParent, n_photo from php_ms_login where lg_nik='"+ req.body.username +"' and lg_password='"+ md5(req.body.password) +"'", 
  {
    type: modelsStatic.sequelizeUser.QueryTypes.SELECT
  }).then(function (data) {
    if(data.length > 0){
      var result = data;
      var theToken = jwt.sign({ user: result.lg_nik }, config.security.salt, { expiresIn: 24 * 60 * 60 });
      api.ok(res, { 
        'nik'         : data[0].lg_nik,
        'name'        : data[0].lg_name,
        'location'    : data[0].lg_location,
        'department'  : data[0].sectionParent,
        'token'       : theToken, 
        'level'       : '',
        'type'        : 'Otsuka',
        'avatar'      : data[0].n_photo, 
      });
    }else{
      modelsStatic.sequelizeSCM.query("select lg_nik, level, approval_level, lg_name from mst_users where lg_nik='"+ req.body.username +"' and password='"+ md5(req.body.password) +"'", 
      {
        type: modelsStatic.sequelizeSCM.QueryTypes.SELECT
      }).then(function (val) {
        if(val.length > 0){
          var result = val;
    
          var theToken = jwt.sign({ user: result.lg_nik }, config.security.salt, { expiresIn: 24 * 60 * 60 });
          api.ok(res, { 
            'nik'         : val[0].lg_nik,
            'name'        : val[0].lg_name,
            'approval_level': val[0].approval_level,
            'location'    : '',
            'department'  : '',
            'level'       : val[0].level,
            'type'        : 'NonOtsuka',
            'token'       : theToken, 
            'avatar'      : '', 
          });
        }else{
          api.error(res, 'Data Pegawai tidak ada', 200);
        }
      });
    }
  }).catch((e) => {
    api.error(res, 'Wrong credentials', 500);
  });
}


function loginVendor (req, res, next){
  modelsStatic.sequelizeVendor.query("SELECT TOP 1 Username, VendorName, SAPCode from v_vendor_miro WHERE Username='"+ req.body.username +"' and Password='"+ md5(req.body.password) +"'", 
  {
    type: modelsStatic.sequelizeVendor.QueryTypes.SELECT
  }).then(function (data) {
    if(data.length > 0){
      var result = data;
      var theToken = jwt.sign({ user: result.Username }, config.security.salt, { expiresIn: 24 * 60 * 60 });
      api.ok(res, { 
        'username'    : data[0].Username,
        'name'        : data[0].VendorName,
        'level'       : 'TRANSPORTER',
        'token'       : theToken,
        'vendorcode'  : data[0].SAPCode,
      });
    }else{
      api.error(res, 'Data tidak ditemukan', 200);
    }
  }).catch((e) => {
    api.error(res, e, 500);
  });
}

module.exports = {
    login,
    loginVendor
};
