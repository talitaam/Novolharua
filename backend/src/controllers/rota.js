import rotaService from "../services/rota";
import moment from "moment";
import var_dump from "var_dump";

class Rota {
	getAvaiableRotas (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");

		let respObj = {};

		try {
			let params = JSON.parse(req.body);
			let dtDoacao = moment(params.data, 'YYYY-MM-DD').format('DD/MM/YYYY');

			var_dump(params);
			var_dump(dtDoacao);
			rotaService.getAvaiableRotas(dtDoacao).then((response) => {
				respObj.rotas = response;
				res.json(respObj);
				next();
			});

		} catch (e) {
			var_dump(e);
			respObj.error = e;
			res.json(respObj);
			next();
		}
	}

	addRota(req, res, next){
		res.setHeader("Access-Control-Allow-Origin", "*");
		try {
			let params = JSON.parse(req.body);
			let qtdPessoas = params.pessoas;
			let nomeRota = param.nomeRota;

			var_dump(params);
			var_dump(qtdPessoas);
			var_dump(nomeRota);

			let respObj = {
				message : "Salvo com sucesso !",
				rota : []
			};

			rotaService.setRota(nomeRota, qtdPessoas).then((response) => {
				respObj.rota = response;
				res.json(respObj);
				next();
			});

		} catch (e) {
			var_dump(e);
			respObj.message = "Um erro inesperado ocorreu !" + e;
			res.json(respObj);
			next();
		}

	}
}

export default new Rota ();
