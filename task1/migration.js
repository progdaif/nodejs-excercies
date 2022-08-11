/**
 * migrations handler
 * @module migration
 */

/** @const mysql [mysql DB driver] */
const mysql = require('mysql');

/** @const dboptions [DB connection params] */
const { dboptions } = require('./config');

/** @const migration [mysql migrations handler] */
const migration = require('mysql-migrations');

/** @const connection [DB pool connection] */
const connection = mysql.createPool(dboptions);

// initial migrations
migration.init(connection, __dirname + '/migrations', function () { }, ["--migrate-all"]);
