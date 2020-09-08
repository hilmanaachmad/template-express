var express = require('express');
var models = require('../../config/sequelize');
var atob = require('atob')
var api = require('../../tools/common');
var multer = require('multer')
var path = require('path')
var modelsStatic = require('../../config/sequelizeStatic');
var AuthCtrl = require('../../controllers/Auth.controller.js');
var MasterDataCtrl = require('../../controllers/SCM/MasterData.controller');
var auth = require('../../tools/middleware');
var router = express.Router();

const dir = path.resolve(__dirname, 'assets/img/background')
router.get('/random-background', function (req, res) {
    randomFile(dir, (err, file) => {
        var dirFile = '/src/assets/img/background/' + file
        api.ok(res, dirFile)
    })
})

var svgCaptcha = require('svg-captcha');
router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.createMathExpr({

    });
    api.ok(res, captcha)
});

const DIR = 'src/assets/img/tmp';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({
    storage: storage
});


// Master Data Authorizaion
router.get('/master/karyawan-with-auth', auth.authorization, MasterDataCtrl.get_karyawan)
router.get('/master/karyawan', MasterDataCtrl.get_karyawan)




module.exports = router;
