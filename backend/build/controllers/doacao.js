'use strict';

var Doacao = function Doacao() {
    var doacaoService = require('../services/doacao');

    undefined.getDoacoes = function () {
        return doacaoService.getAllDoacoes();
    };
};

module.exports = Doacao;