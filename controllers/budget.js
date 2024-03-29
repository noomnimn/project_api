exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget2022 WHERE money_so ='งบประมาณ ปี 2566' ";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findBudgetById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget2022 where id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}

exports.updateBudget = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        code: body.code ? body.code : null,
        name: body.name ? body.name : null,
        money_so: body.money_so ? body.money_so : null,
        department: body.department ? body.department : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        sum: body.sum ? body.sum : null,
        type: body.type ? body.type : null,
        status: body.status ? body.status : null,
        po_id: body.po_id ? body.po_id : null,
        date_po: body.date_po ? body.date_po : null,

        // date_plan: body.date_plan ? body.date_plan : null,
        // date_dt: body.date_dt ? body.date_dt : null,
        // date_st: body.date_st ? body.date_st : null,
        // date_st_en: body.date_st_en ? body.date_st_en : null,
        howto_buy: body.howto_buy ? body.howto_buy : null,
        name_co: body.name_co ? body.name_co : null,
        sum_st: body.sum_st ? body.sum_st : null,
        // date_pay: body.date_pay ? body.date_pay : null,
        sum_pay: body.sum_pay ? body.sum_pay : null,
    }
    req.getConnection(function (err, connection) {
        connection.query("update budget_out_2567 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.add = (req, res, next) => {
    var { body } = req
    var post = {
        id: body.id,
        code: body.code ? body.code : null,
        name: body.name ? body.name : null,
        money_so: body.money_so ? body.money_so : null,
        department: body.department ? body.department : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        sum: body.sum ? body.sum : null,
        type: body.type ? body.type : null,
        status: body.status ? body.status : null,
        po_id: body.po_id ? body.po_id : null,
        date_po: body.date_po ? body.date_po : null,

       // date_plan: body.date_plan ? body.date_plan : null,
       // date_dt: body.date_dt ? body.date_dt : null,
       // date_st: body.date_st ? body.date_st : null,
       // date_st_en: body.date_st_en ? body.date_st_en : null,
        howto_buy: body.howto_buy ? body.howto_buy : null,
        name_co: body.name_co ? body.name_co : null,
        sum_st: body.sum_st ? body.sum_st : null,
       // date_pay: body.date_pay ? body.date_pay : null,
        sum_pay: body.sum_pay ? body.sum_pay : null,
    }
    console.log(post)
   // post.length = post.length.join(',');
    post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT name FROM budget_out_2567  WHERE name= ?", [post.name], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'โครงการซ้ำ'
                })
            } else {
                connection.query("insert into budget_out_2567 set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}
///////////////////////////////////////////////////////
exports.update_formPl = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        date_plan : body.date_plan ? body.date_plan : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update budget2022 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
///////////////////////////////////////////////////////
exports.update_formDt = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        date_dt : body.date_dt ? body.date_dt : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update budget2022 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
///////////////////////////////////////////////////////
exports.update_formSt = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        date_st : body.date_st ? body.date_st : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update budget2022 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
///////////////////////////////////////////////////////
exports.update_formEn = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        date_st_en : body.date_st_en ? body.date_st_en : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update budget2022 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
///////////////////////////////////////////////////////
exports.update_formPa = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        date_pay : body.date_pay ? body.date_pay : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update budget2022 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

///////////////////////////////////////////////////////
exports.update_formDef = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        date_def : body.date_def ? body.date_def : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update budget2022 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
/////////////////////////////////////////////สรุป
exports.findBudgetSum = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT p.money_g AS money, COUNT(`money_so`) AS total, (SUM(sum)) AS sumprice FROM `budget_2567` p GROUP BY p.`money_g` ASC";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findBudgetStatus = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT p.money_g AS money, COUNT(`money_g`) AS total, " +
        "(SUM(price)) AS sumprice, " +
        "(SELECT COUNT(*) FROM budget_2567 a WHERE a.status IS NULL AND a.money_g = p.money_g ) AS WA, " +
        "(SELECT COUNT(*) FROM budget_2567 b WHERE b.status = 'พัสดุดำเนินการ' AND b.money_g = p.money_g ) AS ST, " +
        "(SELECT COUNT(*) FROM budget_2567 b WHERE b.status = 'สิ้นสุดโครงการ' AND b.money_g = p.money_g ) AS EN, " +
        "(SELECT COUNT(*) FROM budget_2567 b WHERE b.status = 'ยกเลิกรายการ' AND b.money_g = p.money_g ) AS CA " +
        "FROM `budget_2567` p GROUP BY p.`money_g` ASC";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findBudgetMoney = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT p.money_so AS budget, " +
        "COUNT(`money_so`) AS total, (SUM(sum)) AS sumprice, " +
        "(SELECT SUM(a.sum) FROM budget2022 a WHERE a.money_so = 'งบประมาณ ปี 2566' AND a.money_so = p.money_so ) AS A, " +
        "(SELECT SUM(b.sum) FROM budget2022 b WHERE b.money_so = '2566-70%UC' AND b.money_so = p.money_so ) AS B, " +
        "(SELECT SUM(c.sum) FROM budget2022 c WHERE c.money_so = 'เงินบำรุง รพ.' AND c.money_so = c.money_so ) AS C, " +
        "(SELECT SUM(d.sum) FROM budget2022 d WHERE d.money_so = 'เงินบริจาค' AND d.money_so = d.money_so ) AS D " +
        "FROM `budget2022` p GROUP BY p.`money_so` ASC";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

//------------------------------------------------------------ตารางค่าเสื่อม
exports.findUC = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget2022 WHERE money_so ='2566-70%UC' ";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

//------------------------------------------------------------ตารางบำรุง
exports.findHosMoney = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget2022 WHERE money_so ='เงินบำรุง รพ.' ";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}


//------------------------------------------------------------ตารางบำรุง
exports.findDonate = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget2022 WHERE money_g ='4'";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

//---------------------------------------------------------- ปีงบประมาณ 2567
exports.findAll2567 = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget_2567 ";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}
exports.findBudg_1 = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT * FROM `budget_2567` WHERE money_g = '1';";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}
exports.findBudg_2 = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT * FROM `budget_2567` WHERE money_g = '2';";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}
exports.findBudg_3 = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT * FROM `budget_2567` WHERE money_g = '3';";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}
exports.findBudget2567ById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget_2567 where id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}
//------------------------------------------------------------*****ต่ำกว่าเกณฑ์
exports.findUmat_1 = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT * FROM `budget_2567_lower` WHERE money_g = '1';";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findUmatById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget_2567_lower where id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}
exports.updateLow2567 = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        code: body.code ? body.code : null,
        name: body.name ? body.name : null,
        money_so: body.money_so ? body.money_so : null,
        department: body.department ? body.department : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        sum: body.sum ? body.sum : null,
        type: body.type ? body.type : null,
        status: body.status ? body.status : null,
        po_id: body.po_id ? body.po_id : null,
        date_po: body.date_po ? body.date_po : null,
        howto_buy: body.howto_buy ? body.howto_buy : null,
        name_co: body.name_co ? body.name_co : null,
        sum_st: body.sum_st ? body.sum_st : null,
        sum_pay: body.sum_pay ? body.sum_pay : null,
        date_plan: body.date_plan ? body.date_plan : null,
        date_dt: body.date_dt ? body.date_dt : null,
        date_st: body.date_st ? body.date_st : null,
        date_st_en: body.date_st_en ? body.date_st_en : null,
        date_def: body.date_def ? body.date_def : null,
        date_pay: body.date_pay ? body.date_pay : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update budget_2567_lower set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.addLow2567 = (req, res, next) => {
    var { body } = req
    var post = {
        id: body.id,
        code: body.code ? body.code : null,
        name: body.name ? body.name : null,
        money_so: body.money_so ? body.money_so : null,
        department: body.department ? body.department : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        sum: body.sum ? body.sum : null,
        type: body.type ? body.type : null,
        status: body.status ? body.status : null,
        po_id: body.po_id ? body.po_id : null,
        date_po: body.date_po ? body.date_po : null,
        howto_buy: body.howto_buy ? body.howto_buy : null,
        name_co: body.name_co ? body.name_co : null,
        sum_st: body.sum_st ? body.sum_st : null,
        sum_pay: body.sum_pay ? body.sum_pay : null,
        date_plan: body.date_plan ? body.date_plan : null,
        date_dt: body.date_dt ? body.date_dt : null,
        date_st: body.date_st ? body.date_st : null,
        date_st_en: body.date_st_en ? body.date_st_en : null,
        date_def: body.date_def ? body.date_def : null,
        date_pay: body.date_pay ? body.date_pay : null,
    }
    console.log(post)
   // post.length = post.length.join(',');
    // post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT code FROM budget_2567_lower  WHERE code= ?", [post.code], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'เคยลงแล้วค่ะ'
                })
            } else {
                connection.query("insert into budget_2567_lower set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}

exports.updateฺBudget2567 = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        code: body.code ? body.code : null,
        name: body.name ? body.name : null,
        money_so: body.money_so ? body.money_so : null,
        department: body.department ? body.department : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        sum: body.sum ? body.sum : null,
        type: body.type ? body.type : null,
        status: body.status ? body.status : null,
        po_id: body.po_id ? body.po_id : null,
        date_po: body.date_po ? body.date_po : null,
        howto_buy: body.howto_buy ? body.howto_buy : null,
        name_co: body.name_co ? body.name_co : null,
        sum_st: body.sum_st ? body.sum_st : null,
        sum_pay: body.sum_pay ? body.sum_pay : null,
        date_plan: body.date_plan ? body.date_plan : null,
        date_dt: body.date_dt ? body.date_dt : null,
        date_st: body.date_st ? body.date_st : null,
        date_st_en: body.date_st_en ? body.date_st_en : null,
        date_def: body.date_def ? body.date_def : null,
        date_pay: body.date_pay ? body.date_pay : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update budget_2567 set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.addฺBudget2567 = (req, res, next) => {
    var { body } = req
    var post = {
        id: body.id,
        code: body.code ? body.code : null,
        name: body.name ? body.name : null,
        money_so: body.money_so ? body.money_so : null,
        department: body.department ? body.department : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        sum: body.sum ? body.sum : null,
        type: body.type ? body.type : null,
        status: body.status ? body.status : null,
        po_id: body.po_id ? body.po_id : null,
        date_po: body.date_po ? body.date_po : null,
        howto_buy: body.howto_buy ? body.howto_buy : null,
        name_co: body.name_co ? body.name_co : null,
        sum_st: body.sum_st ? body.sum_st : null,
        sum_pay: body.sum_pay ? body.sum_pay : null,
        date_plan: body.date_plan ? body.date_plan : null,
        date_dt: body.date_dt ? body.date_dt : null,
        date_st: body.date_st ? body.date_st : null,
        date_st_en: body.date_st_en ? body.date_st_en : null,
        date_def: body.date_def ? body.date_def : null,
        date_pay: body.date_pay ? body.date_pay : null,
    }
    console.log(post)
   // post.length = post.length.join(',');
    // post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT code FROM budget_2567  WHERE code= ?", [post.code], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'เคยลงแล้วค่ะ'
                })
            } else {
                connection.query("insert into budget_2567 set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}

