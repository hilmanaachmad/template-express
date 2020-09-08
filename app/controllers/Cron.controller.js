var jwt = require('jsonwebtoken')
var models = require('../config/sequelize')
var modelsStatic = require('../config/sequelizeStatic')
var api = require('../tools/common')
var config = require('../config/settings')
var Sequelize = require('sequelize')
var nodemailer = require( 'nodemailer')
var cron = require('node-cron');
var moment = require("moment");


// cron.schedule('* * * * * *', () => {
// 	console.log('aktif')
// });





module.exports = {
	
};
