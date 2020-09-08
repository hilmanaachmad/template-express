var jwt = require('jsonwebtoken')
var models = require('./../../config/sequelize')
var modelsStatic = require('../../config/sequelizeStatic')
var api = require('../../tools/common')
var config = require('../../config/settings')
var { Sequelize, Op} = require('sequelize')
var moment = require('moment')


function get_karyawan(req, res) {
  models.users.findAll()
  .then(function(data){
    if(data.length > 0){
      api.ok(res, data)
    }else{
      api.error(res, "Data Kosong", 200)
    }
  }).catch(function(e){
    api.error(res, e, 500)
  })
}




module.exports = {
  get_karyawan
};