/**
 * DB credentials goes here
 */
const object = {
  dboptions: {
    host: "localhost",
    user: "root",  // please place DB priviliged user here
    password: "", // please place DB priviliged user password here
    database: "task1", // please place DB name here
    charset: 'utf8mb4',
    connectionLimit: 10,
  }
}

module.exports = Object.freeze(object);