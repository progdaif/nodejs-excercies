/**
 * Common base functionality shared by models 
 * @module basemodels
 */

/** @const date [date and time handler] */
const date = require('date-and-time');


/**
 * Get the current date formatted
 * 
 * @return {Date} [Formatted date of now]
 */
exports.currentdate = function () {
    const now = new Date();
    return date.format(now, 'YYYY-MM-DD HH:mm:ss');
}