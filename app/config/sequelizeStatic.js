var Sequelize = require("sequelize");

const sequelizeUser = new Sequelize("XMS_NxG", "XMSAPPS", "XMSNxG@123", {
    host: "192.168.1.107",
    dialect: "mssql",
    define: {
        timestamps: false,
        timezone: "+07:00"
    },
    timezone: "+07:00",
    logging: false,
    operatorsAliases: 0,
    
});


const sequelizeVendor = new Sequelize("AVM2","XMSAPPS",  "XMSNxG@123", {
    host: "192.168.1.32",
    dialect: "mssql",
    define: {
        timestamps: false,
        timezone: "+07:00"
    },
    timezone: "+07:00",
    logging: false,
    operatorsAliases: 0,
} );


const sequelizeExpressJS = new Sequelize("expressjs_traning", "root", 'Rider>_<', {
    host: "10.10.2.16",
    dialect: "mysql",
    define: {
        timestamps: false,
        timezone: "+07:00"
    },
    timezone: "+07:00",
    logging: false,
    operatorsAliases: 0
});



const sequelizeDataSAP = new Sequelize("sap_master", "udts", 'Dt5%642', {
    host: "192.168.1.203",
    dialect: "mysql",
    define: {
        timestamps: false,
        timezone: "+07:00"
    },
    timezone: "+07:00",
    logging: false,
    operatorsAliases: 0
});




const sequelizeTablueDTS = new Sequelize("BI_DASHBOARD", "datareader", 'Data123', {
    host: "192.168.1.116",
    dialect: "mssql",
    define: {
        timestamps: false,
        timezone: "+07:00"
    },
    timezone: "+07:00",
    logging: false,
    operatorsAliases: 0,
    dialectOptions: {
        options: {
            instanceName: 'MSSQLSERVER_DWH',
            requestTimeout: 300000
        }
    }
});



// var config={
//     user:'test',
//     password:'db123',
//     server:'localhost',
//     database:'demodb',
//     options:{
//         trusted connection:true,
//         enableArithAbort:true
//     },
//     port:1434
// }


module.exports = {
    sequelizeUser,
    sequelizeExpressJS,
    sequelizeVendor,
    sequelizeDataSAP,
    sequelizeTablueDTS
};