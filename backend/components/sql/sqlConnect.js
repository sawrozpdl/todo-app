const mysql = require('mysql');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'express'
}

function sqlConnect() {
    return new Promise(function (resolve, reject) {
        var conn = mysql.createConnection(config);
        conn.connect(function (error) {
            reject(error);
        });
        resolve(conn);
    });
}

module.exports = sqlConnect;