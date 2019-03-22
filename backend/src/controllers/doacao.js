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
				res.json(respObj);
				next();
			});
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			res.json(respObj);
			next();
		} 	
	}

	addDoacao (req, res, next) {	
		res.setHeader("Access-Control-Allow-Origin", "*");

		let params = req.body.cadastroAgen;
		let respObj = {
			message: "Salvo com sucesso !",
			doacao: []
		};

		try {
			doacaoService.addDoacao(params).then(result => {
				respObj.doacao  = result;
				res.json(respObj);
				next();
			});
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			res.json(respObj);
			next();
		}
	}
}

export default new Doacao ();