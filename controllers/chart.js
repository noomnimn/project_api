exports.findStatus = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT count(*) N FROM `project` WHERE begin_date IS NOT NULL and st_date IS NULL;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findStDate = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT count(*) N FROM `project` WHERE begin_date IS NOT NULL and st_date IS NOT NULL;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.findWait = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT count(*) N FROM `project` WHERE begin_date IS NULL";
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
        var sql = "SELECT `pj_e` pj_e,`group`, COUNT(*) count ,SUM(price) sum FROM project GROUP BY `group`";
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
        var sql = "SELECT pj_e, sum(money_used) A FROM project GROUP BY pj_e;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.sumtype = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT pj_e,sum(price)-sum(money_used) Total,(SELECT SUM(price)) as money_total ,(SELECT SUM(money_used)) as money_used FROM project GROUP BY `pj_e`";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.chart_type = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT pj_e ,SUM(price) AS price , SUM(money_used) AS money_used, result_percent(SUM(price),SUM(money_used)) AS percent_result , used_percent(SUM(price),SUM(money_used)) AS percent_used FROM project GROUP BY pj_e";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.excellence = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT SUM(price) sum_total ,SUM(money_used) sum_used, COUNT(*) n , SUM(price) - SUM(money_used) result FROM project;";
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
        var sql = "SELECT p.pj_e AS project_name, COUNT(`pj_e`) " +
        "AS Total_project, (SUM(price)) AS sumprice, " +
        "(SELECT SUM(a.price) FROM project a WHERE a.money_s = 'กองทุนหลักประกันสุขภาพระดับท้องถิ่นหรือพื้นที่ (กองทุนตำบล)' AND a.pj_e = p.pj_e ) AS A, " +
        "(SELECT SUM(b.price) FROM project b WHERE b.money_s = 'งบประมาณแผนพัฒนาระบบบริการสุขภาพ (Service Plan) จังหวัดสุโขทัย ปีงบประมาณ 2567' AND b.pj_e = p.pj_e ) AS B, " +
        "(SELECT SUM(c.price) FROM project c WHERE c.money_s = 'สถาบันราชประชาสมาสัย กรมควบคุมโรค' AND c.pj_e = p.pj_e ) AS C, " +
        "(SELECT SUM(d.price) FROM project d WHERE d.money_s = 'เงินบำรุง รพ.' AND d.pj_e = p.pj_e ) AS D, " +
        "(SELECT SUM(e.price) FROM project e WHERE e.money_s = 'เงินบำรุง สสอ.' AND e.pj_e = p.pj_e ) AS E, " +
        "(SELECT SUM(f.price) FROM project f WHERE f.money_s = 'เงินพัฒนาและส่งเสริมให้ผู้ประกันตนเพิ่มขึ้น' AND f.pj_e = p.pj_e ) AS F, " +
        "(SELECT SUM(g.price) FROM project g WHERE g.money_s = 'ไม่ใช้งบประมาณ' AND g.pj_e = p.pj_e ) AS G  " +
        "FROM `project` p GROUP BY p.`pj_e` ASC";
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
        var sql = "SELECT SUM(price) sum_total ,SUM(money_used) sum_used, COUNT(*) n ,sum(`price`-`money_used`) result , " +
        "(SELECT SUM(price) FROM project WHERE money_s='กองทุนหลักประกันสุขภาพระดับท้องถิ่นหรือพื้นที่ (กองทุนตำบล)') AS A1, " + 
        "(SELECT SUM(price) FROM project WHERE money_s='งบประมาณแผนพัฒนาระบบบริการสุขภาพ (Service Plan) จังหวัดสุโขทัย ปีงบประมาณ 2567') AS A2, " +
        "(SELECT SUM(price) FROM project WHERE money_s='สถาบันราชประชาสมาสัย กรมควบคุมโรค') AS A3, " +
        "(SELECT SUM(price) FROM project WHERE money_s='เงินบำรุง รพ.') AS A4, " + 
        "(SELECT SUM(price) FROM project WHERE money_s='เงินบำรุง สสอ.') AS A5, " +
        "(SELECT SUM(price) FROM project WHERE money_s='เงินพัฒนาและส่งเสริมให้ผู้ประกันตนเพิ่มขึ้น ') AS A6, " +
        "(SELECT SUM(price) FROM project WHERE money_s= 'ไม่ใช้งบประมาณ') AS A7  " + 
        "FROM project;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

// count department
exports.department_data = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT department, count(*) n FROM project GROUP BY department";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}
//----------------------------------------------------------- รวมตารางงบลงทุน หลังปรับแผน
exports.getSumBudgetMidYear = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT p.money_so AS budget, " +
        "COUNT(`money_so`) AS total, (SUM(sum)) AS sumprice, " +
        "(SELECT COUNT(a.money_so) FROM budget_2567 a WHERE a.status IS NULL AND a.money_so = p.money_so ) AS pend_b, " + 
        "(SELECT COUNT(a.money_so) FROM budget_2567 a WHERE a.status  = 'พัสดุดำเนินการ' AND a.money_so = p.money_so ) AS sto, " + 
        "(SELECT COUNT(a.money_so) FROM budget_2567 a WHERE a.status = 'สิ้นสุดโครงการ' AND a.money_so = p.money_so ) AS end, " + 
        "(SELECT COUNT(a.money_so) FROM budget_2567 a WHERE a.status = 'ยกเลิกรายการ' AND a.money_so = p.money_so ) AS cc_budg " +
        "FROM `budget_2567` p WHERE status IS NULL OR status != 'ยกเลิกรายการ' " +
        "GROUP BY p.`money_so` ASC";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}
//----------------------------------------------------------- รวมตารางงบลงทุน ล่าง
exports.sumaryBudget = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT SUM(sum) sum_total,COUNT(*) n, " +
            "(SELECT COUNT(*) FROM budget_2567 WHERE status ='ยกเลิกรายการ') AS cc, " +
            "(SELECT COUNT(*) FROM budget_2567 WHERE status IS NULL) AS A1, " +
			"(SELECT COUNT(*) FROM budget_2567 WHERE status ='พัสดุดำเนินการ') AS A2, " +
            "(SELECT COUNT(*) FROM budget_2567 WHERE status ='สิ้นสุดโครงการ') AS A3, " +
			"(SELECT SUM(sum) FROM budget_2567 WHERE status IS NULL) AS B1, " +
			"(SELECT SUM(sum) FROM budget_2567 WHERE status ='พัสดุดำเนินการ') AS B2, " +
            "(SELECT SUM(sum) FROM budget_2567 WHERE status ='สิ้นสุดโครงการ') AS B3 " +
            "FROM budget_2567 WHERE status IS NULL or `status` != 'ยกเลิกรายการ';";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

//----------------------------------------------------------- รวมตารางงบลงทุน ล่าง
exports.sumaryBudgetOut = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)
        var sql = "SELECT SUM(sum) sum_total,COUNT(*) n, " +
            "(SELECT COUNT(*) FROM budget_out_2567 WHERE status IS NULL) AS A1, " + 
			"(SELECT COUNT(*) FROM budget_out_2567 WHERE status ='พัสดุดำเนินการ') AS A2, " +
            "(SELECT COUNT(*) FROM budget_out_2567 WHERE status ='สิ้นสุดโครงการ') AS A3, " +
			"(SELECT SUM(sum) FROM budget_out_2567 WHERE status IS NULL) AS B1, " + 
			"(SELECT SUM(sum) FROM budget_out_2567 WHERE status ='พัสดุดำเนินการ') AS B2, " +
            "(SELECT SUM(sum) FROM budget_out_2567 WHERE status ='สิ้นสุดโครงการ') AS B3 " +
            "FROM budget_out_2567;";
        connection.query(sql, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}

