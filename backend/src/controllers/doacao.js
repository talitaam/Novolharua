import doacaoService from "../services/doacao"; 
import moment from "moment";

class Doacao {
	getAllDoacoes (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let respObj = {
			doacoes: []
		};

		try {
			doacaoService.getAllDoacoes().then(response => {
				response.forEach((row) => {
					row['DTDOACAO'] = moment(row['DTDOACAO']).format('DD/MM/YYYY');
				});

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

		let params = req.body.doacao;
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