exports.updateStatus = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        status: body.status ? body.status : null,
        date_plan: body.date_plan ? body.date_plan : null,
        date_dt: body.date_dt ? body.date_dt : null,
        date_st: body.date_st ? body.date_st : null,
        date_mn: body.date_mn ? body.date_mn : null,
        
    }
    req.getConnection(function (err, connection) {
        connection.query("update requirements set ? where requirement_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.updateMoney = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        m_date: body.m_date ? body.m_date : null,
        money: body.money ? body.money : null,
    }
    req.getConnection(function (err, connection) {
        connection.query("update requirements set ? where requirement_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.updateStock = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        agreement_id: body.agreement_id ? body.agreement_id : null,
        date_po: body.date_po ? body.date_po : null,
        date_limit: body.date_limit ? body.date_limit : null,
        date_completed: body.date_completed ? body.date_completed : null,
        money_st: body.money_st ? body.money_st : null,
        store: body.store ? body.store : null,
    }
    req.getConnection(function (err, connection) {
        connection.query("update requirements set ? where requirement_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.updatePJ = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        dt_date: body.dt_date ? body.dt_date : null,
        st_date: body.st_date ? body.st_date : null,
        reply_date: body.reply_date ? body.reply_date : null,
        plan_date : body.plan_date ? body.plan_date : null,
        dep_date : body.dep_date ? body.dep_date : null,
        money_used : body.money_used ? body.money_used : null
    }
    req.getConnection(function (err, connection) {
        connection.query("update projects set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.updateMoneyUsed = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        money_used : body.money_used ? body.money_used : null,
        status : body.status ? body.status : null

    }
    req.getConnection(function (err, connection) {
        connection.query("update projects set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
