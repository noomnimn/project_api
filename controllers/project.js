exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from projects ";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findProject = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from project ORDER BY pj_id ASC";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findProjectApp = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from project ORDER BY pj_id ASC";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findProjectById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from projects where pj_id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}
// APPROVE
exports.findApproveById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from project where pj_id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}


// ---------------------------------------------------------------- //
// ---------------------------------------------------------------- //
// ---------------------------------------------------------------- //
// ---------------------------------------------------------------- //

exports.createProjects = (req, res, next) => {
    var { body } = req
    var post = {
        pj_id: body.pj_id,
        pj_code: body.pj_code ? body.pj_code : null,
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
      //  dt_date : body.dt_date ? body.dt_date : null,
      //  st_date : body.st_date ? body.st_date : null,
       // plan_date : body.plan_date ? body.plan_date : null,
       // dep_date : body.dep_date ? body.dep_date : null,
       // reply_date : body.reply_date ? body.reply_date : null,
       // pro_pj : body.pro_pj ? body.pro_pj : null,
        money_used : body.money_used ? body.money_used : null,
        project_code : body.project_code ? body.project_code : null,
        item_food : body.item_food ? body.item_food : null,
        item_food_pp : body.item_food_pp ? body.item_food_pp : null,
        item_food_price : body.item_food_price ? body.item_food_price : null,
        item_food_am : body.item_food_am ? body.item_food_am : null,
        item_food_tot : body.item_food_tot ? body.item_food_tot : null,

    }
    console.log(post)
   // post.length = post.length.join(',');
    // post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT name FROM project_sum  WHERE name= ?", [post.name], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'โครงการซ้ำ'
                })
            } else {
                connection.query("insert into project_sum set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}

exports.updateProjects = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
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
        money_s: body.money_s ? body.money_s : null,
        money_detail: body.money_detail ? body.money_detail : null,
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
        // pro_pj : body.pro_pj ? body.pro_pj : null,
        money_used : body.money_used ? body.money_used : null,
        project_code : body.project_code ? body.project_code : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update project set ? where pj_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

