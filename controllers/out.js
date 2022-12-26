exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget_out";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}
exports.findById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from budget_out where id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}
exports.updateOut = (req, res, next) => {
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
        connection.query("update budget_out set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.addOut = (req, res, next) => {
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
        connection.query("SELECT code FROM budget_out  WHERE code= ?", [post.code], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'เคยลงแล้วค่ะ'
                })
            } else {
                connection.query("insert into budget_out set ?", post, (err, results) => {
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
        connection.query("update budget_out set ? where id =?", [post, id], function (err, results) {
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
        connection.query("update budget_out set ? where id =?", [post, id], function (err, results) {
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
        connection.query("update budget_out set ? where id =?", [post, id], function (err, results) {
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
        connection.query("update budget_out set ? where id =?", [post, id], function (err, results) {
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
        connection.query("update budget_out set ? where id =?", [post, id], function (err, results) {
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
        connection.query("update budget_out set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}