const db = require('./db');
const res = { 'status': false, 'msg': 'No record found', 'data': null };

module.exports = {
    getAllCircles: function (cb) {
        db.conn.query(
            'SELECT c.*, u.email FROM tbl_circle c inner join user u on c.created_by = u.id ORDER BY c.id DESC',
            function (err, rows, fields) {
                if (err) {
                    res.msg = err;
                    return cb(res);
                } else {
                    res.data = rows;
                    res.status = true;
                    res.msg = 'Data fetched';
                    return cb(res);
                }
            }
        );
    },
    UpdateCircle: function (params, cb) {
        var circle_name = params.circle_name;
        var status = params.is_active;
        var circle_id = params.circle_id;
        db.conn.query(
            'SELECT circle_name FROM tbl_circle WHERE id <> ? AND circle_name = ?',
            [circle_id, circle_name],
            function (err, data, fields) {
                if (data.length == 0) {
                    db.conn.query(
                        'UPDATE tbl_circle SET circle_name = ?, is_active = ? WHERE id = ?',
                        [circle_name, status, circle_id],
                        function (err, data, fields) {
                            res.status = true;
                            res.msg = 'Circle is successfully updated';
                            return cb(res);
                        }
                    )
                } else {
                    res.status = false;
                    res.msg = 'Same circle name is already exists 1';
                    return cb(res);
                }
            }
        )
    },
    SaveCircle: function (params, cb) {
        var circle_name = params.circle_name;
        var status = params.is_active;
        var current_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        if (status == null) {
            status = 1;
        }

        db.conn.query(
            'SELECT id FROM tbl_circle WHERE circle_name = ?',
            [circle_name],
            (err, data, fields) => {
                if (data.length == 0) {
                    db.conn.query(
                        'INSERT INTO tbl_circle (circle_name, is_active, created_at, created_by) VALUES (?, ?, ?, ?)',
                        [circle_name, status, current_date, 1],
                        (err, result) => {
                            if (err == null) {
                                res.status = true;
                                res.msg = 'Record successfully saved';
                                return cb(res);
                            } else {
                                res.status = false;
                                res.msg = err.sqlMessage;
                                return cb(res);
                            }
                        }
                    )
                } else {
                    res.status = false;
                    res.msg = 'Same circle name is already exists';
                    return cb(res);
                }
            }
        );
    },
    DeleteCircle: function(id, cb) {
        db.conn.query(
            'DELETE FROM tbl_circle WHERE id = ?',
            [id], (err, res, fields) => {
                if(err) {
                    res.msg = 'Error: ' + err.sqlMessage;
                    return cb(res);
                } else {
                    res.status = true;
                    res.msg = 'Record successfully deleted';
                    return cb(res);
                }
            }
        )
    }
}