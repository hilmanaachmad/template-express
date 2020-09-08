var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("./settings");

const Dir_SupplyChainManagement = path.join(__dirname, "../models/SCM");

const Seq_SupplyChainManagement = new Sequelize(
    config.scm.database.name,
    config.scm.database.user,
    config.scm.database.pass, {
        logging: config.scm.database.log,
        dialect: config.scm.database.dialect,
        host: config.scm.database.host,
        define: {
            timestamps: false,
            timezone: "+07:00"  
        },
        timezone: "+07:00",
        operatorsAliases: 0
    }
);

const db = {};
let model;

// Seq_NoticeMe.sync({ force: false })
// .then(() => {
//   console.log(`Database synchronize!`)
// })

// //CANTEEN
fs.readdirSync(Dir_SupplyChainManagement)
    .filter(file => {
        return file.indexOf(".") !== 0 && file.indexOf(".map") === -1;
    })
    .forEach(file => {
        model = Seq_SupplyChainManagement.import(
            path.join(Dir_SupplyChainManagement, file)
        );
        db[model.name] = model;
    });

Object.keys(db).forEach(name => {
    if ("associate" in db[name]) {
        db[name].associate(db);
    }
});




module.exports = db