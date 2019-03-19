'use strict';

var router = new (require('restify-router').Router)();
var Doacao = require('../controllers/doacao');

// Busca as Doações
router.get('/', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	console.log('asdasd');

	var result = Doacao.getDoacoes();

	res.json({
		doacoes: result.doacoes
	});

	next();
});

// Salva as Doações
router.post('/save', function (req, res, next) {
	var params = req.params;

	var result = Doacao.saveDoacao(params);

	res.json({
		message: "Salvo com sucesso !",
		query: result.doacao
	});

	next();
});

module.exports = router;