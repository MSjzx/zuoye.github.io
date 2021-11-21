const mysql = require('mysql2');
const config = require('../config/config.db');
// 创建连接池
const pool = mysql.createPool(config);


exports = module.exports = pool;