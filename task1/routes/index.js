/**
 * All routes of the app
 * @module routes
 */

/** @const express [express framework object] */
const express = require('express');

/** @const router [express router] */
const router = express.Router();

/** @const productController [controller for these routes] */
const productCotoller = require('../controllers/productController');

/**
 * @api {get} /
 * @apiName Home
 * @apiGroup Product
 * @apiSuccess (Success 200) {text} Products Data
*/
router.get('/', function (req, res, next) {
    let callback = function (data) { res.render('product/view', { data }); }
    productCotoller.get(req, res, callback);
    next();
});

/**
 * @api {get} /
 * @apiName Create Product
 * @apiGroup Product
 */
router.get('/create', function (req, res, next) {
    res.render('product/add', { msg: req.flash('info') });
    next();
});

/**
 * @api {post} /
 * @apiName Store Product
 * @apiGroup Product
 *
 * @apiParam {Json} product Data.
 *
 * @apiSuccess (Success 200)
 * @apiError {text} 404/Not Failed TO store Product
 */
router.post('/store', function (req, res, next) {
    let callback = function (err, data) { res.redirect('/'); }
    productCotoller.addProduct(req, res, callback);
    next();
});

/**
 * @api {get} /
 * @apiName Edit Product
 * @apiGroup Product
 *
 * @apiParam {Integer} productId.
 *
 * @apiSuccess (Success 200)
 * @apiError {text} 404/Not Failed TO Update Product
 */
router.get('/edit/:id', function (req, res, next) {
    let callback = function (data) {
        if (typeof data[0] != 'undefined') {
            data = data[0];
        } else {
            res.render('error', { error: { status: 200, stack: "product not exists" } });
        }

        res.render('product/edit', { data, msg: req.flash('info') })
    };
    productCotoller.show(req.params.id, callback);
    next();
});

/**
 * @api {put} /
 * @apiName Edit Product
 * @apiGroup Product
 *
 * @apiParam {Integer} productId.
 *
 * @apiSuccess (Success 200)
 * @apiError {text} 404/Not Failed TO Update Product
 */

router.put('/update/:id', function (req, res, next) {
    let callback = function () { res.redirect('/'); }
    productCotoller.updateProduct(req, res, callback);
    next();
});

/**
 * @api {delete} /
 * @apiName delete Product
 * @apiGroup Product
 *
 * @apiParam {Integer} productId.
 *
 * @apiSuccess (Success 200)
 * @apiError {text} 404/Not Failed TO DELETE Product
 */

router.delete('/delete/:id', function (req, res, next) {
    let callback = function () { res.redirect('/'); }
    productCotoller.deleteProduct(req, res, callback);
    next();
});

module.exports = router;