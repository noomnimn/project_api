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

// ตารางแยก บน
exports.sumpriceBygroup = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT p.name_g AS project_name, COUNT(`group`) AS Total_project,`group`, (SUM(price)) AS sumprice, (SELECT SUM(a.price) FROM projects a WHERE a.money_s = 'PPA' AND a.name_g = p.name_g ) AS PPA, (SELECT SUM(b.price) FROM projects b WHERE b.money_s = 'QOF' AND b.name_g = p.name_g ) AS QOF, (SELECT SUM(c.price) FROM projects c WHERE c.money_s = 'เงินบำรุง รพ.' AND c.name_g = p.name_g ) AS Maintenance, (SELECT SUM(d.price) FROM projects d WHERE d.money_s = 'งบประมาณ' AND d.name_g = p.name_g ) AS Budget, (SELECT SUM(e.price) FROM projects e WHERE e.money_s = 'สปสช.2' AND e.name_g = p.name_g ) AS A, (SELECT SUM(f.price) FROM projects f WHERE f.money_s = 'สปส.สท' AND f.name_g = p.name_g ) AS B, (SELECT SUM(g.price) FROM projects g WHERE g.money_s = 'กองทุนตำบล' AND g.name_g = p.name_g ) AS C FROM `projects` p GROUP BY p.`group` ASC ";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

// รวมตาราง ล่าง
exports.sumary = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT SUM(price) sum_total ,SUM(pro_pj) sum_used, COUNT(*) n ,sum(`price`-`pro_pj`) result ,(SELECT SUM(price) FROM projects WHERE money_s='PPA') AS PPA, (SELECT SUM(price) FROM projects WHERE money_s='เงินบำรุง รพ.') AS Maintenance,(SELECT SUM(price) FROM projects WHERE money_s='งบประมาณ') AS Budget,(SELECT SUM(price) FROM projects WHERE money_s='สปส.สท') AS A, (SELECT SUM(price) FROM projects WHERE money_s='สปสช.2') AS B,(SELECT SUM(price) FROM projects WHERE money_s='กองทุนตำบล') AS District_fund,(SELECT SUM(price) FROM projects WHERE money_s= 'QOF') AS QOF FROM projects;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}