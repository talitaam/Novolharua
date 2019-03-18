const router = new (require('restify-router')).Router();
const Doacao = require('../controllers/doacao');

// Busca as Doações
router.post('/', function (req, res, next) {
	let result = Doacao.getDoacoes();
	
	res.json({
		doacoes: result.doacoes
	});
	
	next();
});

// Salva as Doações
router.post('/save', function (req, res, next) {
	let params = req.params;

	let result = Doacao.saveDoacao(params);

	res.json({
		message: "Salvo com sucesso !",
		query: result.doacao
	});

	next();
});

module.exports = router;