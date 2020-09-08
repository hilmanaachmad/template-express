function ok(res, data) {

    return res.status(200).json({
        status: true,
        'data': data
    });

}

function error(res, message, code) {

    return res.status(code).json({
        'status': false,
        'data': {
            'message': message
        }
    });
}

function RunningNumber(data, category) {
    console.log(category);
    // let str = "001/DT/AIO/DIST/01/20";
    // tslint:disable-next-line: one-variable-per-declaration
    let d = new Date(),
    month = '' + (d.getMonth() + 1);
    if (month.length < 2) {
        month = '0' + month;
    }

    const format = '/DT/AIO/';
    const tahun = new Date().getFullYear().toString().substr(-2);

    let array = [];
    let tahun_runner;
    let no_runner;
    let kategori = ''

    if (category == 'Distributor') {
        kategori = 'DIST'
    } else if (category == 'Cabang') {
        kategori = 'ODI'
    } else if (category == 'DCMT') {
        kategori = 'DCMT'
    }

    if (data != null) {
        array = data.split('/');
        tahun_runner = parseInt(array[5]);
        no_runner = array[0];
        if (tahun_runner == parseInt(tahun)) {
            no_runner++;
        } else {
            no_runner = 1;
        }
    } else {
        tahun_runner = tahun
        no_runner = 1
    }


    if (no_runner <= 9) {
        no_runner = '00' + no_runner;
    } else if (no_runner > 9 && no_runner <= 99) {
        no_runner = '0' + no_runner;
    }

    let running = no_runner + format + kategori + '/' + month + '/' + tahun;
    return running;
}

function getDayofWeek(day) {
    var dayNames = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return dayNames[day]
}


function formatStringSAP(num, size) {
    var string = String(num);
    while (string.length < (size || 2)) {
        string = "0" + string;
    }
    return string;
}


function RunningNumberOA(data, plant) {
    console.log('ini data yang dilempar ' +data);
    // let str = "001/OA/AIO/SKB/01/20";
    
    let d = new Date(),
    month = '' + (d.getMonth() + 1);
    if (month.length < 2) {
        month = '0' + month;
    }

    const format = '/OA/AIO/';
    const tahun = new Date().getFullYear().toString().substr(-2);

    let array = [];
    let tahun_runner;
    let no_runner;
    let location = ''

    if (plant == 'Sukabumi') {
        location = 'SKB'
    } else if (plant == 'Kejayan') {
        location = 'KJY'
    }

    if (data != null) {
        array = data.split('/');
        tahun_runner = parseInt(array[5]);
        no_runner = array[0];
        if (tahun_runner == parseInt(tahun)) {
            no_runner++;
        } else {
            no_runner = 1;
        }
    } else {
        tahun_runner = tahun
        no_runner = 1
    }


    if (no_runner <= 9) {
        no_runner = '00' + no_runner;
    } else if (no_runner > 9 && no_runner <= 99) {
        no_runner = '0' + no_runner;
    }

    let running = no_runner + format + location + '/' + month + '/' + tahun;
    return running;
}



function RunningNumber_nomor_dokumen(data){
    let d = new Date(),
    month = '' + (d.getMonth() + 1);
    if (month.length < 2) {
        month = '0' + month;
    }
    const tahun = new Date().getFullYear().toString();

    let array = [];
    let tahun_runner;
    let no_runner;

    if (data != null) {
        array = data.split('/');
        tahun_runner = parseInt(array[0]);
        no_runner = array[2];
        if (tahun_runner == parseInt(tahun)) {
            no_runner++;
        } else {
            no_runner = 1;
        }
    } else {
        tahun_runner = tahun
        no_runner = 1
    }


    if (no_runner <= 9) {
        no_runner = '00' + no_runner;
    } else if (no_runner > 9 && no_runner <= 99) {
        no_runner = '0' + no_runner;
    }

    let running = tahun + '/' + month + '/' +no_runner ;
    return running;
}




module.exports = {
    ok,
    error,
    getDayofWeek,
    RunningNumber,
    formatStringSAP,
    RunningNumberOA,
    RunningNumber_nomor_dokumen

}