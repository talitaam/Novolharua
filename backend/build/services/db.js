'use strict';

/*  
***********************************************
    Author: Thiguet <https://github.com/thiguet>
    Date: 16/03/2019
***********************************************
*/
// Class to handle Database operations. 
module.exports = function () {
    var _this = this;

    var connParams = require('./config');
    var mysql = require('mysql');

    var getConn = function getConn() {
        try {
            return mysql.createConnection(connParams);
        } catch (e) {
            throw e;
        }
    };

    // Binds the params to query and run it.
    // Arguments :
    // - sql : a SQL query. Ex.: SELECT * FROM DOACAO WHERE NOME = :NOME_DOADOR ;
    // - params : a key-value object with the params to your query. 
    // Ex.: {
    //  NOME_DOADOR : "(ASAH) - Arantes Soares Américo Haddad"
    // }  
    this.prepareAndRunQuery = function (sql, params) {
        var sqlResult = _this.prepareAndRunQuery(sql, params);
        return _this.runQuery(sqlResult);
    };

    var hasParamInQuery = function hasParamInQuery(sql, key) {
        return sql.indexOf('@' + key) !== -1;
    };

    // Binds the params to query and run it.
    // Arguments :
    // - params : a key-value object with the params to your query. 
    // Ex.: {
    //  NOME_DOADOR : "(ASAH) - Arantes Soares Américo Haddad"
    // }
    this.prepareQuery = function (sql, params) {
        // for statement over object properties.
        for (key in params) {
            if (hasParamInQuery(sql, key)) {
                var value = mysql.escape(params[key]);
                sql.replace('@' + key, value);
            }
        }

        return sql;
    };

    // Runs a SQL query
    // Arguments :
    // - sql : a SQL query. Ex.: SELECT * FROM DOACAO WHERE NOME = :NOME_DOADOR;
    this.runQuery = function (sql) {
        var runQuery = new Promise(function (resolve, reject) {
            var conn = void 0;
            try {
                conn = getConn();
                conn.query(sql, [true], function (error, results, fields) {
                    if (error) {
                        throw error;
                    } else {
                        return resolve(results);
                    }
                });
            } catch (e) {
                return reject(e);
            } finally {
                conn.end();
            }
        });

        return runQuery;
    };
};