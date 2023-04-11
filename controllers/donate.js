exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from money_donate";
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
        var sql = "select * from money_donate where id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}

exports.update = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        date: body.date ? body.date : null,
        name_bank: body.name_bank ? body.name_bank : null,
        bank_no: body.bank_no ? body.bank_no : null,
        money_b: body.money_b ? body.money_b : null,
        money_d: body.money_d ? body.money_d : null,
        money_s: body.money_s ? body.money_s : null,
        money_p: body.money_p ? body.money_p : null,
        money_u: body.money_u ? body.money_u : null,
    }
    req.getConnection(function (err, connection) {
        connection.query("update money_donate set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.add = (req, res, next) => {
    var { body } = req
    var post = {
        id: body.id,
        date: body.date ? body.date : null,
        name_bank: body.name_bank ? body.name_bank : null,
        bank_no: body.bank_no ? body.bank_no : null,
        money_b: body.money_b ? body.money_b : null,
        money_d: body.money_d ? body.money_d : null,
        money_s: body.money_s ? body.money_s : null,
        money_p: body.money_p ? body.money_p : null,
        money_u: body.money_u ? body.money_u : null,
    }
    console.log(post)
   // post.length = post.length.join(',');
    // post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT date FROM money_donate  WHERE date= ?", [post.doc_sw], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'เดือนนี้ อัพเดตแล้วค่ะ'
                })
            } else {
                connection.query("insert into money_donate set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}