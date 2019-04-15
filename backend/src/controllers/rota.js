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
}

export default new Rota ();