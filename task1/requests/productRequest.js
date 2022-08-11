/**
 * Validate requests related to product module
 * @module productRequest
 */

/** @const Joi [handle validations] */
const Joi = require('joi');

/**
 * Validate request parameters
 * 
 * @param  {Request} request [request to be validated]
 * 
 * @return void
 */
const validate = (request) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).error((errors) => new Error('Name required with min 5 char and max 255')),
        quantity: Joi.number().error((errors) => new Error('Quantity required with a positive number')),
        brand: Joi.string().min(5).max(255).error((errors) => new Error('Brand required with min 5 char and max 255')),
    });

    const { error, value } = schema.validate(request);
    if (typeof error != 'undefined') return error.message;
    else return false;
}

module.exports = {
    validate
}