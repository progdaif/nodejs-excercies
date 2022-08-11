/**
 * Controller handling products CRUD
 * @module productController
 */

/** @const productService [product model] */
const productModel = require('../services/productService').productModel;

/** @const productRequest [request validator] */
const validation = require('../requests/productRequest');

/**
 * Get products
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
const get = (req, res, callback) => {
    productModel.getProducts(callback);
}

/**
 * Show a product
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
const show = (id, callback) => {
    productModel.getProductById(id, callback);
}

/**
 * Add a product
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
const addProduct = (req, res, callback) => {
    if (validation.validate(req.body)) {
        let message = validation.validate(req.body);
        req.flash('info', message)
        res.redirect('back');
        return;
    }
    productModel.addProduct(req.body, callback);
}

/**
 * Update a product
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
const updateProduct = (req, res, callback) => {
    if (validation.validate(req.body)) {
        let message = validation.validate(req.body);
        req.flash('info', message)
        res.redirect('back');
        return;
    }
    productModel.updateProduct(req, callback);
}

/**
 * Delete a product
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
const deleteProduct = (req, res, callback) => {
    productModel.deleteProduct(req.params.id, callback);
}
module.exports = {
    get,
    show,
    addProduct,
    updateProduct,
    deleteProduct
};
