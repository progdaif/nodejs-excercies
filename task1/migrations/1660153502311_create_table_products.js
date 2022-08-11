/**
 * Create products table main structure
 * @module createTableProducts
 */

module.exports = {
    "up": "CREATE TABLE `products` (`id` int(10) UNSIGNED NOT NULL,PRIMARY KEY id (id), `name` varchar(255) NOT NULL,`quantity` int(11) NOT NULL,`brand` varchar(255) NOT NULL,`created_at` datetime NOT NULL,`updated_at` datetime NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8",
    "down": "DROP TABLE products"
}