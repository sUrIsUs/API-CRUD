const database = require('../../../database/mysql');
const control = require('./controlador');

module.exports = control(database);