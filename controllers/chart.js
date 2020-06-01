exports.findStatus = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT status, COUNT(*) N FROM project GROUP BY status";
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
        var sql = "SELECT COUNT(*)A ,pj_e N FROM project GROUP BY pj_e";
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
        var sql = "SELECT pj_e, sum(pro_pj) A FROM project GROUP BY pj_e;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.sumtype = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT pj_e,sum(price)-sum(pro_pj) Total,(SELECT SUM(price)) as money_total ,(SELECT SUM(pro_pj)) as money_used FROM project GROUP BY `pj_e`";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.chart_type = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT pj_e ,SUM(price) AS price , SUM(pro_pj) AS pro_pj, result_percent(SUM(price),SUM(pro_pj)) AS percent_result , used_percent(SUM(price),SUM(pro_pj)) AS percent_used FROM project GROUP BY pj_e";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.excellence = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT SUM(price) sum_total ,SUM(pro_pj) sum_used, COUNT(*) n , SUM(price) - SUM(pro_pj) result FROM project;";
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
        var sql = "SELECT p.pj_e AS project_name, COUNT(`pj_e`) AS Total_project, (SUM(price)) AS sumprice,(SELECT SUM(a.price) FROM project a WHERE a.money_s = 'PPA' AND a.pj_e = p.pj_e ) AS PPA, (SELECT SUM(b.price) FROM project b WHERE b.money_s = 'QOF' AND b.pj_e = p.pj_e ) AS QOF,(SELECT SUM(c.price) FROM project c WHERE c.money_s = 'เงินบำรุง รพ.' AND c.pj_e = p.pj_e ) AS Maintenance, (SELECT SUM(d.price) FROM project d WHERE d.money_s = 'งบประมาณแผ่นดิน' AND d.pj_e = p.pj_e ) AS Budget,(SELECT SUM(e.price) FROM project e WHERE e.money_s = 'สปสช.' AND e.pj_e = p.pj_e ) AS A,(SELECT SUM(f.price) FROM project f WHERE f.money_s = 'สป.สธ.' AND f.pj_e = p.pj_e ) AS B,(SELECT SUM(g.price) FROM project g WHERE g.money_s = 'กองทุนตำบล' AND g.pj_e = p.pj_e ) AS C , (SELECT SUM(h.price) FROM project h WHERE h.money_s = 'สำนักงานประกันสังคมจังหวัดสุโขทัย' AND h.pj_e = p.pj_e ) AS st , (SELECT SUM(i.price) FROM project i WHERE i.money_s = 'อื่นๆ' AND i.pj_e = p.pj_e ) AS etc FROM `project` p GROUP BY p.`pj_e` ASC";
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
        var sql = "SELECT SUM(price) sum_total ,SUM(pro_pj) sum_used, COUNT(*) n ,sum(`price`-`pro_pj`) result ,(SELECT SUM(price) FROM project WHERE money_s='PPA') AS PPA, (SELECT SUM(price) FROM project WHERE money_s='เงินบำรุง รพ.') AS Maintenance,(SELECT SUM(price) FROM project WHERE money_s='งบประมาณแผ่นดิน') AS Budget,(SELECT SUM(price) FROM project WHERE money_s='สป.สธ.') AS A, (SELECT SUM(price) FROM project WHERE money_s='สปสช.') AS B,(SELECT SUM(price) FROM project WHERE money_s='กองทุนตำบล') AS District_fund,(SELECT SUM(price) FROM project WHERE money_s= 'QOF') AS QOF ,(SELECT SUM(price) FROM project WHERE money_s= 'สำนักงานประกันสังคมจังหวัดสุโขทัย') AS st, (SELECT SUM(price) FROM project WHERE money_s= 'อื่นๆ') AS etc FROM project";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}