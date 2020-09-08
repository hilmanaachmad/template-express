var jwt = require('jsonwebtoken')
var models = require('../config/sequelize')
var modelsStatic = require('../config/sequelizeStatic')
var api = require('../tools/common')
var config = require('../config/settings')
var Sequelize = require('sequelize')
var nodemailer = require( 'nodemailer')
var moment = require('moment')

function send_Email(req, res){
	var transport = nodemailer.createTransport({
		host: 'mail.aio.co.id',
		port: '587',
		secure: false,
		auth: {
			user: 'appsskb@aio.co.id',
			pass: 'Plicaskb1234'
		},
		tls: {rejectUnauthorized: false},
		debug: true
	});

	var message = {
		subject : 'Contoh Email subject',
		from    : '"D&T Service Online" <appsskb@aio.co.id>',
		to      : 'hachmad@aio.co.id',
		text    : 'Contoh Email Text',
		html    : 'Contoh Email'
	};
	transport.sendMail(message,function (err) {
		if(err){
			console.log(err);
			api.error(res, err, 500)	
		}else{
			console.log("Email Sent!")
			api.ok(res, "Email Sent!")	
		}
	});
}

// send_Email()


module.exports = {
	send_Email
};
