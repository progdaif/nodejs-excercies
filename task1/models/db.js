/**
 * DB handler class
 * @module product
 */

/** @const mysql [mysql DB driver] */
const mysql = require('mysql');

/** @const dboptions [DB connection params] */
const { dboptions } = require('../config');

/** @const con [DB pool connection] */
const con = mysql.createPool(dboptions);

/**
 * Execute queries
 * 
 * @param  {String} sql [query to be executed]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
exports.execute = function (sql, callback) {
    con.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sql, function (err, rows) {
            connection.release();
            if (err) throw err;
            callback(JSON.parse(JSON.stringify(rows)))
        });
    });
}