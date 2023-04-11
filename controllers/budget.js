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
        connection.query("update budget2022 set ? where id =?", [post, id], function (err, results) {
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
        connection.query("SELECT name FROM budget2022  WHERE name= ?", [post.name], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'โครงการซ้ำ'
                })
            } else {
                connection.query("insert into budget2022 set ?", post, (err, results) => {
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
        var sql = "SELECT p.money_g AS money, COUNT(`money_so`) AS total, (SUM(sum)) AS sumprice FROM `budget2022` p GROUP BY p.`money_g` ASC";
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
        var sql = "SELECT p.money_so AS money, COUNT(`money_so`) AS total, (SUM(price)) AS sumprice,(SELECT COUNT(*) FROM budget2022 a WHERE a.status IS NULL AND a.money_so = p.money_so ) AS WA, (SELECT COUNT(*) FROM budget2022 b WHERE b.status = 'พัสดุดำเนินการ' AND b.money_so = p.money_so ) AS ST, (SELECT COUNT(*) FROM budget2022 b WHERE b.status = 'สิ้นสุดโครงการ' AND b.money_so = p.money_so ) AS EN, (SELECT COUNT(*) FROM budget2022 b WHERE b.status = 'ยกเลิก' AND b.money_so = p.money_so ) AS CA FROM `budget2022` p GROUP BY p.`money_so` ASC";
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
        var sql = "select * from budget2022 WHERE id BETWEEN 126 AND 134;";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}