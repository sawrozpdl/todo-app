const sqlConnect = require('./sqlConnect');

module.exports = function(query) {
    return new Promise(function (resolve, reject) {
        sqlConnect().then(function (connection) {
            connection.query(query, function (error, results, field) {
                connection.end();
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        }).catch(function(error) {
            reject(error);
        })
    });
}