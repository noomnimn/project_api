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
       // dt_date: body.dt_date ? body.dt_date : null,
       // st_date: body.st_date ? body.st_date : null,
       // reply_date: body.reply_date ? body.reply_date : null,
       // plan_date : body.plan_date ? body.plan_date : null,
       // plan_st_date : body.plan_st_date ? body.plan_st_date : null,
       // begin_date : body.begin_date ? body.begin_date : null,
        status_plan : body.status_plan ? body.status_plan : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.updateMoneyUsed = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        status : body.status ? body.status : null,
        money_used : body.money_used ? body.money_used : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.updateCode = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        project_code : body.project_code ? body.project_code : null,
        begin_date : body.begin_date ? body.begin_date : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.update_dateDt = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        dt_date : body.dt_date ? body.dt_date : null,


    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.update_dateSt = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        st_date : body.st_date ? body.st_date : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
exports.update_dateplanSt = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        plan_st_date : body.plan_st_date ? body.plan_st_date : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.update_dateReply = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        reply_date : body.reply_date ? body.reply_date : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}
//*************************************** */
exports.createProject = (req, res, next) => {
    var { body } = req
    var post = {
        pj_id: body.pj_id,
        name: body.name ? body.name : null,
        category_m: body.category_m ? body.category_m : null,
        category_mn: body.category_mn ? body.category_mn : null,
        department: body.department ? body.department : null,
        reason: body.reason ? body.reason : null,
        wish: body.wish ? body.wish : null,
        pj_detail: body.pj_detail ? body.pj_detail : null,
        pj_goal: body.pj_goal ? body.pj_goal : null,
        pj_person: body.pj_person ? body.pj_person : null,
        group: body.group ? body.group : null,
        money_detail: body.money_detail ? body.money_detail : null,
        money_s: body.money_s ? body.money_s : null,
        price: body.price ? body.price : null,
        note: body.note ? body.note : null,
        pj_e: body.pj_e ? body.pj_e : null,
        ministry: body.ministry ? body.ministry : null,
        policy: body.policy ? body.policy : null,
        budget: body.budget ? body.budget : null,
        firstname: body.firstname ? body.firstname : null,
        lastname: body.lastname ? body.lastname : null,
        department_f: body.department_f ? body.department_f : null,
        length: body.length ? body.length : null,
        status: body.status ? body.status : null,
        dt_date : body.dt_date ? body.dt_date : null,
        st_date : body.st_date ? body.st_date : null,
        plan_date : body.plan_date ? body.plan_date : null,
        dep_date : body.dep_date ? body.dep_date : null,
        reply_date : body.reply_date ? body.reply_date : null,
        plan_st_date : body.plan_st_date ? body.plan_st_date : null,
        begin_date : body.begin_date ? body.begin_date : null,
        pro_pj : body.pro_pj ? body.pro_pj : null,
        money_used : body.money_used ? body.money_used : null,
        project_code : body.project_code ? body.project_code : null,
        status_plan : body.status_plan ? body.status_plan : null,
    }
    console.log(post)
    post.length = post.length.join(',');
    req.getConnection(function (err, connection) {
        connection.query("SELECT name FROM project  WHERE name= ?", [post.name], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'โครงการซ้ำ'
                })
            } else {
                connection.query("insert into project set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}

