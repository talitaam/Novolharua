"use strict";

var Doacao = function Doacao() {
    var dbService = require('./db');
    var GET_ALL_DOACOES = "SELECT * FROM DOACAO ORDER BY 1";

    var getAllDoacoes = function getAllDoacoes() {
        dbService.runQuery(sqlStatement).then(function (result) {
            return result;
        });
    };

    var getDonationByUser = function getDonationByUser(userId) {
        // Not Implemented Yet
    };
};

module.exports = Doacao;