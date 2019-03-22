import rotaService from "../services/rota";

class Rota {
	getAvaiableRotas (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		
		let respObj = {};

		try {
			let params = req.body;
			let dtDoacao = params.parent;
			rotaService.getAvaiableRotas(dtDoacao).then((response) => {
				respObj.rotas = response;
				res.json(respObj);
				next();
			});
			
		} catch (e) {
			respObj.error = e;
			res.json(respObj);
			next();
		}
	}
}

export default new Rota ();