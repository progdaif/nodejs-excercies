/**
 * product model the DB table products
 * @module product
 */

/** @const db [DB handler] */
const db = require('./db');

/** @const currentdate [current date] */
const currentdate = require('./basemodels').currentdate();

/**
 * Get products
 * 
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
exports.getProducts = function (callback) {
    db.execute("SELECT * FROM `products`;", callback);
}

/**
 * Add a product
 * 
 * @param  {Object} data [product data to be stored]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
exports.addProduct = function (data, callback) {
    let sql = "INSERT INTO `products` SET name='" + data.name + "' , quantity='" + data.quantity + "'" +
        " , brand='" + data.brand + "' , created_at='" + currentdate + "', updated_at='" + currentdate + "' ";
    db.execute(sql, callback);
}

/**
 * Update product
 * 
 * @param  {Object} data [product data to be updated]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
exports.updateProduct = function (data, callback) {
    let sql = "UPDATE `products` SET name='" + data.name + "' , quantity='" + data.quantity + "'" +
        " , brand='" + data.brand + "' , updated_at='" + currentdate + "' WHERE id=" + data.id;
    db.execute(sql, callback);
}

/**
 * Get product By Id
 * 
 * @param  {Number} id [product id to be retreived]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
exports.getProductById = function (id, callback) {
    db.execute("SELECT * FROM `products` where id =" + id, callback);
}

/**
 * Delete a product
 * 
 * @param  {Number} id [product id to be deleted]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
exports.deleteProduct = function (id, callback) {
    db.execute("DELETE FROM `products` where id =" + id, callback);
}

