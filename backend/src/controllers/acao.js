import acaoService from "../services/acao";

class Acao {
	getAllAcoes (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let respObj = {
			acoes: []
		};

		try {
			acaoService.getAllAcoes().then(response => {
				respObj.acoes = response;
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

export default new Acao ();
