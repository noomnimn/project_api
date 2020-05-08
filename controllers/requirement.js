exports.findReqById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        // var sql = "select * from requirements where requirement_id = ? ";
        var sql = `SELECT req.requirement_id,
IF(req.req_plantype = 'ในแผน',pl.plan_name,req.requirement_name) AS requirement_name,
req.requirement_code,req.firstname,req.lastname,req.department,req.department2,req.position,req.req_plantype,req.unit,req.price,req.amount,req.total_price,req.status,req.req_type,req.detail,req.replace_id,req.agreement_id,req.date_po,req.date_limit,req.date_completed,req.m_date,req.expenses,req.money_source,req.created,req.updated,req.quotation1,quotation2,req.quotation3,req.file4,req.image,req.spec_file,req.plan_file,req.replace_id,req.boqfile,req.catalog_file,req.date_plan,req.date_dt,req.date_st,req.money,req.money_st,req.date_mn,req.store
FROM requirements req
LEFT JOIN plans pl ON req.requirement_name = pl.plan_id 
WHERE req.requirement_id = ?`;
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}

exports.findAll = (req, res, next) => {
    var param = req.params;
    console.log(param);
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT req.requirement_id,"
            + "IF(req.req_plantype = 'ในแผน',pl.plan_name,req.requirement_name) AS requirement_name,"
            + "req.requirement_code,req.firstname,req.lastname,req.department,req.department2,req.position,req.req_plantype,req.unit,req.price,req.amount,req.total_price,req.status,req.req_type,req.detail,req.replace_id,req.agreement_id,req.date_po,req.date_limit,req.date_completed,req.m_date,req.expenses,req.money_source,req.created,req.updated,req.quotation1,quotation2,req.quotation3,req.file4,req.image,req.spec_file,req.plan_file,req.replace_id,req.date_plan,req.date_dt,req.date_st,req.money,req.money_st,req.catalog_file,req.date_mn,req.store "
            + "FROM requirements req "
            + "LEFT JOIN plans pl ON req.requirement_name = pl.plan_id ";


        if (param.text != 'undefined' && param.fields != 'undefined') {
            sql += "WHERE pl.plan_name LIKE '%{text}%' OR req.requirement_name LIKE '%{text1}%' OR req.department2 LIKE '%{text2}%' OR req.req_plantype LIKE '%{text3}%' OR req.status LIKE '%{text4}%'";
            sql = sql.replace('{text}', param.text);
            sql = sql.replace('{text1}', param.text);
            sql = sql.replace('{text2}', param.text);
            sql = sql.replace('{text3}', param.text);
            sql = sql.replace('{text4}', param.text);
        }

        sql += "ORDER BY req.requirement_id DESC LIMIT {limit} OFFSET {offset}";
        sql = sql.replace('{limit}', param.limit);
        sql = sql.replace('{offset}', param.offset);

        console.log(sql);
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            if (results.length > 0) {

                var count = "SELECT req.requirement_id,"
                    + "IF(req.req_plantype = 'ในแผน',pl.plan_name,req.requirement_name) AS requirement_name,"
                    + "req.requirement_code,req.firstname,req.lastname,req.department,req.department2,req.position,req.req_plantype,req.unit,req.price,req.amount,req.total_price,req.status,req.req_type,req.detail,req.replace_id,req.agreement_id,req.date_po,req.date_limit,req.date_completed,req.m_date,req.expenses,req.money_source,req.created,req.updated,req.quotation1,quotation2,req.quotation3,req.file4,req.image,req.spec_file,req.plan_file,req.replace_id,req.date_plan,req.date_dt,req.date_st,req.date_mn,req.store "
                    + "FROM requirements req "
                    + "LEFT JOIN plans pl ON req.requirement_name = pl.plan_id ";

                if (param.text != 'undefined' && param.fields != 'undefined') {
                    count += "WHERE pl.plan_name LIKE '%{text}%' OR req.requirement_name LIKE '%{text1}%' OR req.department2 LIKE '%{text2}%' OR req.req_plantype LIKE '%{text3}%' OR req.status LIKE '%{text4}%'";
                    count = count.replace('{text}', param.text);
                    count = count.replace('{text1}', param.text);
                    count = count.replace('{text2}', param.text);
                    count = count.replace('{text3}', param.text);
                    count = count.replace('{text4}', param.text);
                }
                console.log(count)
                connection.query(count, (err, resu) => {
                    if (err) return next(err)
                    var result = {
                        results: results,
                        total: resu.length > 0 ? resu.length : 0,
                        total_page: Math.ceil((resu.length / param.limit))
                    }
                    res.send(result)
                })
            } else {
                var result = {
                    results: results,
                    total: results.length > 0 ? results.length : 0,
                    total_page: 0
                }
                res.send(result)
            }
        })
    })
}


exports.createReq = (req, res, next) => {
    var { body } = req
    var post = {
        requirement_id: body.requirement_id,
        requirement_name: body.requirement_name ? body.requirement_name : null,
        requirement_code: body.requirement_code ? body.requirement_code : null,
        firstname: body.firstname ? body.firstname : null,
        lastname: body.lastname ? body.lastname : null,
        department: body.department ? body.department : null,
        department2: body.department2 ? body.department2 : null,
        position: body.position ? body.position : null,
        req_plantype: body.req_plantype ? body.req_plantype : null,
        unit: body.unit ? body.unit : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        total_price: body.total_price ? body.total_price : null,
        status: body.status ? body.status : null,
        req_type: body.req_type ? body.req_type : null,
        detail: body.detail ? body.detail : null,
        quotation1: body.quotation1 ? body.quotation1 : null,
        quotation2: body.quotation2 ? body.quotation2 : null,
        quotation3: body.quotation3 ? body.quotation3 : null,
        file4: body.file4 ? body.file4 : null,
        replace_id: body.replace_id ? body.replace_id : null,
        agreement_id: body.agreement_id ? body.agreement_id : null,
        date_po: body.date_po ? body.date_po : null,
        date_limit: body.date_limit ? body.date_limit : null,
        date_completed: body.date_completed ? body.date_completed : null,
        m_date: body.m_date ? body.m_date : null,
        image: body.image ? body.image : null,
        expenses: body.expenses ? body.expenses : null,
        money_source: body.money_source ? body.money_source : null,
        spec_file: body.spec_file ? body.spec_file : null,
        plan_file: body.plan_file ? body.plan_file : null,
        catalog_file: body.catalog ? body.catalog : null,
        boqfile: body.boqfile ? body.boqfile : null,
        created: new Date(),
        date_plan: body.date_plan ? body.date_plan : null,
        date_dt: body.date_dt ? body.date_dt : null,
        date_st: body.date_st ? body.date_st : null,
        money_st: body.money_st ? body.money_st : null,
        money: body.money ? body.money : null,
        date_mn: body.date_mn ? body.date_mn : null,
        store: body.store ? body.store : null,
    }
    req.getConnection(function (err, connection) {
        connection.query("SELECT requirement_code FROM requirements  WHERE requirement_code= ?", [post.requirement_code], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'รายการครุภัณฑ์นี้มีในระบบแล้ว'
                })
            } 
            else {
                connection.query("insert into requirements set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 200, results })
                    req.params.id = body.requirement_id;
                    module.exports.findPlanById(req, res, next);

                })
            }
        })
    })

}

exports.deleteReq = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        connection.query("delete from requirements where requirement_id = ? ", [id], (err, results) => {
            if (err) return next(err)
            res.send(results)
        })

    })
}

exports.updateReq = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        requirement_name: body.requirement_name ? body.requirement_name : null,
        requirement_code: body.requirement_code ? body.requirement_code : null,
        firstname: body.firstname ? body.firstname : null,
        lastname: body.lastname ? body.lastname : null,
        department: body.department ? body.department : null,
        department2: body.department2 ? body.department2 : null,
        position: body.position ? body.position : null,
        req_plantype: body.req_plantype ? body.req_plantype : null,
        unit: body.unit ? body.unit : null,
        price: body.price ? body.price : null,
        amount: body.amount ? body.amount : null,
        total_price: body.total_price ? body.total_price : null,
        status: null,
        req_type: body.req_type ? body.req_type : null,
        detail: body.detail ? body.detail : null,
        quotation1: body.quotation1 ? body.quotation1 : null,
        quotation2: body.quotation2 ? body.quotation2 : null,
        quotation3: body.quotation3 ? body.quotation3 : null,
        file4: body.file4 ? body.file4 : null,
        replace_id: body.replace_id ? body.replace_id : null,
        agreement_id: body.agreement_id ? body.agreement_id : null,
        date_po: body.date_po ? body.date_po : null,
        date_limit: body.date_limit ? body.date_limit : null,
        date_completed: body.date_completed ? body.date_completed : null,
        m_date: body.m_date ? body.m_date : null,
        image: body.image ? body.image : null,
        catalog_file: body.catalog ? body.catalog : null,
        expenses: body.expenses ? body.expenses : null,
        money_source: body.money_source ? body.money_source : null,
        spec_file: body.spec_file ? body.spec_file : null,
        plan_file: body.plan_file ? body.plan_file : null,
        date_plan: body.date_plan ? body.date_plan : null,
        date_dt: body.date_dt ? body.date_dt : null,
        date_st: body.date_st ? body.date_st : null,
        money_st: body.money_st ? body.money_st : null,
        money: body.money ? body.money : null,
        date_mn: body.date_mn ? body.date_mn : null,
        store : body.store ? body.store : null,

    }
    req.getConnection(function (err, connection) {
        connection.query("update requirements set ? where requirement_id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.exportData = (req, res, next) => {
    console.log(req.params)
    var sql = `SELECT
	req.requirement_id,

IF (
	req.req_plantype = 'ในแผน',
	pl.plan_name,
	req.requirement_name
) AS requirement_name,
 req.requirement_code,
 req.firstname,
 req.lastname,
 req.department,
 req.department2,
 req.position,
 req.req_plantype,
 req.unit,
 req.price,
 req.amount,
 req.total_price,
 req.STATUS,
 req.req_type,
 req.detail,
 req.replace_id,
 req.agreement_id,
 req.date_po,
 req.date_limit,
 req.date_completed,
 req.m_date,
 req.expenses,
 req.money_source,
 req.created,
 req.replace_id,
 req.date_plan,
 req.date_dt,
 req.date_st,
 req.money,
 req.money_st,
 req.date_mn
FROM
	requirements req
LEFT JOIN plans pl ON req.requirement_name = pl.plan_id `
    var status = null;
    if (req.params.status == 'เอกสารไม่ถูกต้อง') {
        status = 'เอกสารไม่ถูกต้อง';
        sql += "where req.STATUS = '{text}'";
        sql = sql.replace('{text}', status);
    } else if (req.params.status == 'ผ่านแผน') {
        status = 'ผ่านแผน';
        sql += "where req.STATUS = '{text}'";
        sql = sql.replace('{text}', status);
    } else if (req.params.status == 'ผู้อำนวยการอนุมัติ') {
        status = 'ผู้อำนวยการอนุมัติ';
        sql += "where req.STATUS = '{text}'";
        sql = sql.replace('{text}', status);
    } else if (req.params.status == 'พัสดุดำเนินการ') {
        status = 'พัสดุดำเนินการ';
        sql += "where req.STATUS = '{text}'";
        sql = sql.replace('{text}', status);
    } else if (req.params.status == 'การเงินดำเนินการ') {
        status = 'การเงินดำเนินการ';
        sql += "where req.STATUS = '{text}'";
        sql = sql.replace('{text}', status);
    } else if (req.params.status == 'ยกเลิกรายการ') {
        status = 'ยกเลิกรายการ';
        sql += "where req.STATUS = '{text}'";
        sql = sql.replace('{text}', status);
    } else if (req.params.status == 'สิ้นสุดโครงการ') {
        status = 'สิ้นสุดโครงการ';
        sql += "where req.STATUS = '{text}'";
        sql = sql.replace('{text}', status);
    }

    console.log(sql)

    req.getConnection((err, connection) => {
        if (err) return next(err)
        connection.query(sql, status, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })

    })
}

