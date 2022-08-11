/**
 * All routes of the app
 * @module routes
 */

/** @const express [express framework object] */
const express = require('express');

/** @const router [express router] */
const router = express.Router();

/** @const productController [controller for these routes] */
const csvController = require('../controllers/csvController');

/** @const multer [processes a single file associated with the given form field] */
const multer = require('multer');

/** @const csv [CSV file handler] */
const csv = require('fast-csv');

// Set global directory
global.__basedir = __dirname;

/**
 * Multer Upload Storage
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/../uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

/**
 * Filter for CSV file
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {File} res [Object to be responded]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};
const upload = multer({ storage: storage, fileFilter: csvFilter });



/**
 * @api {get} /
 * @apiName Home
 * @apiGroup CSV
 * @apiSuccess (Success 200) {text} CSV form
*/
router.get('/', function (req, res, next) {
    res.render('index');
    next();
});

/**
 * @api {Post} /
 * @apiName Upload
 * @apiGroup CSV
 * @apiSuccess (Success 200) {text} get csv file
*/
router.post('/', upload.single("file"), function (req, res) {
    let callback = function (data) { res.render('index', { data }); }
    csvController.get(req, res, callback);
    next();
});

module.exports = router;