exports.add = (req, res, next) => {
    var { body } = req
    var post = {
        id: body.id,
        created: new Date(),
        doc_no: body.doc_no ? body.doc_no : null,
        date_doc: body.date_doc ? body.date_doc : null,
        doc_from: body.doc_from ? body.doc_from : null,
        doc_to: body.doc_to ? body.doc_to : null,
        doc_name: body.doc_name ? body.doc_name : null,
        doc_sw: body.doc_sw ? body.doc_sw : null,
        doc_type: body.doc_type ? body.doc_type : null,
    }
    console.log(post)
   // post.length = post.length.join(',');
    // post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT doc_sw FROM doc_osm  WHERE doc_sw= ?", [post.doc_sw], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'หนังสือนี้ เคยลงแล้วค่ะ'
                })
            } else {
                connection.query("insert into doc_osm set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}

exports.update = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        doc_no: body.doc_no ? body.doc_no : null,
        date_doc: body.date_doc ? body.date_doc : null,
        doc_from: body.doc_from ? body.doc_from : null,
        doc_to: body.doc_to ? body.doc_to : null,
        doc_name: body.doc_name ? body.doc_name : null,
        doc_sw: body.doc_sw ? body.doc_sw : null,
        doc_type: body.doc_type ? body.doc_type : null,
    }
    req.getConnection(function (err, connection) {
        connection.query("update doc_osm set ? where id =?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send({ status: 'ok', results })
        })
    })
}

exports.findById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from doc_osm where id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}

exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from doc_osm";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

//------------------------------------------------------ออกเลขหนังสือ กง.
exports.addDocSend = (req, res, next) => {
    var { body } = req
    var post = {
        id: body.id,
        created: new Date(),
        doc_no: body.doc_no ? body.doc_no : null,
        doc_to: body.doc_to ? body.doc_to : null,
        doc_name: body.doc_name ? body.doc_name : null,
        detail: body.detail ? body.detail : null,
    }
    console.log(post)
   // post.length = post.length.join(',');
    // post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT doc_no FROM doc_send  WHERE doc_no= ?", [post.doc_sw], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'หนังสือนี้ เคยส่งแล้วค่ะ'
                })
            } else {
                connection.query("insert into doc_send set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}

exports.findAllSend = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from doc_send";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

//------------------------------------------------------ออกเลขหนังสือ สารบรรณ
exports.addDocSw = (req, res, next) => {
    var { body } = req
    var post = {
        id: body.id,
        created: new Date(),
        doc_no: body.doc_no ? body.doc_no : null,
        type: body.type ? body.type : null,
        doc_to: body.doc_to ? body.doc_to : null,
        doc_name: body.doc_name ? body.doc_name : null,
        detail: body.detail ? body.detail : null,
    }
    console.log(post)
   // post.length = post.length.join(',');
    // post.reply_date = post.reply_date.join('-');
    req.getConnection(function (err, connection) {
        connection.query("SELECT id FROM doc_ssw  WHERE id= ?", [post.id], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({
                    status: 201, message: 'หนังสือนี้ เคยส่งแล้วค่ะ'
                })
            } else {
                connection.query("insert into doc_ssw set ?", post, (err, results) => {
                    if (err) return next(err)
                    res.send({ status: 'ok', results })
                })
            }
        })
    })
}

exports.findAllDocSSW = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from doc_ssw ORDER BY id DESC;";
        // var params = "%" + req.query.term + "%"
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}