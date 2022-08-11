/**
 * Create products table id primary with AUTO_INCREMENT attribute
 * @module createTableProductsPrimaryKey
 */

module.exports = {
    "up": "ALTER TABLE `products` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
    "down": ""
}