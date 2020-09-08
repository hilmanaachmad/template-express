var jwt = require ('jsonwebtoken');
var modelsStatic =  require ('../config/sequelizeStatic');
var api = require ('../tools/common');
var config = require ('../config/settings');
var models = require('../config/sequelize')
var Sequelize = require ('sequelize');

var md5 = require('md5'); 
var moment = require('moment')

var rfc = require('node-rfc');



function get_tableMARA(){
	var currentDate = moment().format("YYYY-MM-DD H:mm:ss")
	var client = new rfc.Client({'user': 'aioabap', 'passwd': 'Abap1234', 'ashost': '192.168.1.86', 'sysnr': '30', 'client': '888'});
	// var client = new rfc.Client({'user': 'aioabap', 'passwd': 'Abap1234', 'ashost': '192.168.1.84', 'sysnr': '20', 'client': '200'});
	client.connect(function(err) {
		if (err) {
			api.error(res, err.message, 200)
		}else{

			var bodyData = {
				"QUERY_TABLE": "MARA",
				"OPTIONS": [{
					"TEXT": "MTART = 'ZF01'"
				},
				{
					"TEXT": "OR MTART = 'ZF02'"
				},
				{
					"TEXT": "AND MTART = 'ZF02'"
				},
				{
					"TEXT": "AND LVORM <> 'X'"
				}],
				"DELIMITER": "!",
				"FIELDS": [
				{ 
					"FIELDNAME": "MATNR"
				},
				{ 
					"FIELDNAME": "BRGEW"
				},
				{ 
					"FIELDNAME": "NTGEW"
				},
				{ 
					"FIELDNAME": "GEWEI"
				},
				{ 
					"FIELDNAME": "VOLUM"
				},
				{ 
					"FIELDNAME": "VOLEH"
				},
				{
					"FIELDNAME": "MATKL"
				},
				{
					"FIELDNAME": "LVORM"
				}
				]
			}
			client.invoke('RFC_READ_TABLE', bodyData, function(err, res) {
				if (err) {  
					console.log(err)
				}else{
					models.sap_table_mara.destroy({ truncate : true, cascade: false })
					
					for (var i = res.DATA.length - 1; i >= 0; i--) {
						var splitValue = res.DATA[i].WA.split("!")
						var array = {
							material_number: splitValue[0].trim(),
							gross_weight: splitValue[1].trim(),
							net_weight: splitValue[2].trim(),
							weight_unit: splitValue[3].trim(),
							volume: splitValue[4].trim(),
							volume_unit: splitValue[5].trim(),
							material_group : splitValue[6].trim(),
							status: splitValue[7].trim(),
							created_date: currentDate
						}

						console.log('MARA', array)
						models.sap_table_mara.create(array)
					}
				}
			})
		}
	})	
}


module.exports = {
	
};



// LDC Name
// T001L