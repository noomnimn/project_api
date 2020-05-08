exports.findStatus = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT status, COUNT(*) N FROM projects GROUP BY status";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findExcellence = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT COUNT(*) N FROM projects GROUP BY pj_e ";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findEx = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT COUNT(*)A ,pj_e N FROM projects GROUP BY pj_e";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findCountbyGroup = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT `name_g` name_g,`group`, COUNT(*) count ,SUM(price) sum FROM projects GROUP BY `group`";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findSumbyGroup = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT `group`,SUM(price) sum from projects GROUP BY `group`";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.sumbymoney = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT pj_e, sum(pro_pj) A FROM projects GROUP BY pj_e;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.sumtype = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT `group`,`money`,`use` ,SUM(`money`-`use`) AS Total FROM mtype GROUP BY `group`;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.chart_type = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT pj_e ,SUM(price) AS price , SUM(pro_pj) AS pro_pj, result_percent(SUM(price),SUM(pro_pj)) AS percent_result , used_percent(SUM(price),SUM(pro_pj)) AS percent_used FROM projects GROUP BY pj_e";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.excellence = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT SUM(price) sum_total ,SUM(pro_pj) sum_used, COUNT(*) n ,sum(`price`-`pro_pj`) result FROM projects;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}