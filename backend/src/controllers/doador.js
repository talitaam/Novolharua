import doadorService from "../services/doador";

class Doador {
  getAllDoadores (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let respObj = {
			doadores: []
		};

		try {
			doadorService.getAllDoadores().then(response => {
				respObj.doadores = response;
				res.json(respObj);
				next();
			});
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			res.json(respObj);
			next();
		}
	}

	getDoadoresPorStatus (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		const params = JSON.parse(req.body);
		const status = parseInt(params.status);
		let respObj = {
			doadores: []
		};

		try {
			doadorService.getDoadoresPorStatus(status)
				.then(response => {
					respObj.doadores = response;
					res.json(respObj);
					next();
				})
				.catch(response => {
					respObj.message = "Um erro inesperado ocorreu ! Ex: " + response.sqlMessage;
					res.json(respObj);
					next();
				});
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			res.json(respObj);
			next();
		}
	}

	ativarDoador (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		const params = JSON.parse(req.body);
		let respObj = {
			doador: []
		};

		try {
			doadorService.ativarDoador(params)
				.then(response => {
					respObj.doador = response;
					res.json(respObj);
					next();
				})
				.catch(response => {
					respObj.message = "Um erro inesperado ocorreu ! Ex: " + response.sqlMessage;
					res.json(respObj);
					next();
				});
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			res.json(respObj);
			next();
		}
	}

	addDoador (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		const params = JSON.parse(req.body);
		let respObj = {};

		try {
			doadorService.addDoador(params)
				.then(response => {
					respObj.doador = response;
					respObj.message = "Salvo com sucesso !";
							
					res.json(respObj);
					next();
				})
				.catch(response => {
					respObj.message = "Um erro inesperado ocorreu ! Ex: " + response.sqlMessage;
					res.json(respObj);
					next();
				});
		} catch(e) {
			respObj.message = "Um erro inesperado ocorreu !" + e;
			res.json(respObj);
			next();
		}
	}

	removerDoador (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let params = JSON.parse(req.body);
		let respObj = {
			doador: []
		};

		try {
			doadorService.removerDoador(params)
				.then(response => {
					respObj.doador = response;
					res.json(respObj);
					next();
				})
				.catch(response => {
					respObj.message = "Um erro inesperado ocorreu ! Ex: " + response.sqlMessage;
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
export default new Doador ();
