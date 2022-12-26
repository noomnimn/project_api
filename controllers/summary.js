exports.newproject = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT * FROM `project_sum` ORDER BY created DESC ";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.outTable = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT p.money_so AS budget, " +
        "COUNT(`money_so`) AS total, (SUM(sum)) AS sumprice, " +
        "(SELECT COUNT(a.money_so) FROM budget_out a WHERE a.status IS NULL AND a.money_so = p.money_so ) AS A, " +
        "(SELECT COUNT(a.money_so) FROM budget_out a WHERE a.status = 'พัสดุดำเนินการ' AND a.money_so = p.money_so ) AS B, " +
        "(SELECT COUNT(a.money_so) FROM budget_out a WHERE a.status = 'สิ้นสุดโครงการ' AND a.money_so = p.money_so ) AS C " +
        "FROM `budget_out` p GROUP BY p.`money_so` ASC ";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.inTable = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT p.money_so AS budget, " +
        "COUNT(`money_so`) AS total, (SUM(sum)) AS sumprice, " +
       "(SELECT COUNT(a.money_so) FROM budget2022 a WHERE a.status IS NULL AND a.money_so = p.money_so ) AS A, " +
       "(SELECT COUNT(a.money_so) FROM budget2022 a WHERE a.status = 'พัสดุดำเนินการ' AND a.money_so = p.money_so ) AS B, " +
       "(SELECT COUNT(a.money_so) FROM budget2022 a WHERE a.status = 'สิ้นสุดโครงการ' AND a.money_so = p.money_so ) AS C " +
       "FROM `budget2022` p GROUP BY p.`money_so` ";
       connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}