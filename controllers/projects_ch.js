exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT * from projects_check";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findprojectChById = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "select * from projects_check where pj_id = ? ";
        connection.query(sql, [id], (err, results) => {
            if (err) return next(err)
            res.send(results[0])
        })
    })
}