var api = require('../tools/common')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var salt = config.security.salt;
var models = require ('./../config/sequelize');
var modelsStatic = require ('./../config/sequelizeStatic');

function authorization(req, res, next) {
    var token = req.headers['authorization'];
    var flag = true;
    if (token == null || token == '') {
        flag = false;
    }
    if (flag) {
        jwt.verify(token, salt, function (err, decoded) {
            // body...
            if (err) {
                api.error(res, "Token consistency error", "401");
            } else {
                return next();
            }
        });
    } else {
        api.error(res, "Token not provided", "401");
    }
}


function OtherAuthorization(req, res, next){
    var token = req.headers['authorization'];
    var flag = true;
    if (token == null || token == '') {
        flag = false;
    }

    models.auth_token.findAll({
        where:{
            status : 'ACTIVE'
        }
    }).then(function(data){
        if(data.length > 0){
            if (flag) {
                models.auth_token.findAll({
                    where:{
                        token : token,
                        status : 'ACTIVE'
                    }
                }).then(function(data_2){
                    if(data_2.length > 0){
                        return next();
                    }else{
                        api.error(res, "Token consistency error", "401");
                    }
                }).catch(function(e){
                    api.error(res, e, "500");
                })
            }else{
                api.error(res, "Token consistency error", "401");
            }
        }else{
            return next();
        }
    }).catch(function(e){
        api.error(res, e, "500");
    })
}

module.exports = {
    authorization,
    OtherAuthorization
}