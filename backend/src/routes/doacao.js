const router = new (require('restify-router')).Router();
const Doacao = require('../controllers/doacao');
const var_dump = require('var_dump');

// Busca as Doações
router.get('/', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	var_dump(Doacao);
	console.log(Object.keys(Doacao));

	let result = Doacao();
	
	result.then((response) => {
		res.json({
			doacoes: response
		});
		
		next();
	});
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