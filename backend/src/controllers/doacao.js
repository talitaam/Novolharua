import doacaoService from "../services/doacao"; 

class Doacao {
	getAllDoacoes (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let respObj = {
			doacoes: []
		};

		try {
			doacaoService.getAllDoacoes().then(response => {
				respObj.doacoes = response;
				console.log(respObj.doacoes);
				res.json(respObj);
				next();
			});
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			console.error(respObj.message);
			res.json(respObj);
			next();
		} 	
	}

	addDoacao (req, res, next) {	
		res.setHeader("Access-Control-Allow-Origin", "*");

		let params = req.params;

		console.log();

		let respObj = {
			message: "Salvo com sucesso !",
			doacoes: []
		};

		try {
			respObj.doacao  = doacaoService.addDoacao(params);
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			console.error(respObj.message);
		} finally {
			res.json(respObj);
			next();
		}
	}
}

export default new Doacao ();